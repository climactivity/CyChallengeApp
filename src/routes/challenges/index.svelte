<script lang="ts" context="module">
	import { availableChallenges, availableTags, availableTopics } from '$testData/challenges';
	export async function load({ params, fetch, session, stuff }) {
		return {
			status: 200,
			props: {
				data: availableChallenges,
				tags: availableTags,
				tagList: Object.keys(availableTags),
				topics: availableTopics,
				topicList: Object.keys(availableTopics)
			}
		};
	}
</script>

<script lang="ts">
	import type { AcceptedChallenge, ChallengeV2 } from '$lib/types/challenges';
	import { fly, slide } from 'svelte/transition';

	let insets: Writable<any> = getContext('insets');

	import { headerState } from '$lib/stores/header-store';
	import HeaderBar from '$lib/components/header-bar.svelte';
	import type { Writable } from 'svelte/store';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Confetti from '$lib/components/particles/confetti.svelte';
	import FilterIcon from '$lib/components/icons/filter-icon.svelte';
	import { randomIntBetween } from '$lib/util';
	import SearchButton from '$lib/components/buttons/search-button.svelte';
	import HeroCard from '$lib/components/challenge/hero-card.svelte';
	import ChallengeCard from '$lib/components/challenge/challenge-card.svelte';
	import { AnimationRole, mainScreenAnim } from '$lib/animations/page-transition-anim';
	import { linear, cubicIn, cubicOut } from 'svelte/easing';
	import { navigating } from '$app/stores';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';
	headerState.set({
		backbutton: false,
		title: 'Card Demo',
		hidden: false
	});

	export let data: ChallengeV2[];
	export let topics;
	export let topicList;
	let filter = [];

	export let tags = {
		big_point: 'Big Point',
		easy_action: 'Easy Action',
		save_money: 'Save Money',
		empty_tag: 'Empty Tag'
	};
	export let tagList;

	const addFilterTag = (tag: string) => {
		filter = filter.includes(tag) ? filter.filter((item) => item !== tag) : [tag];
	};

	$: console.log(filter);

	let scrollY = 0;
	let filterShadow = 0,
		titleShadow = 0;
	$: titleShadow = Math.min(Math.max(0, scrollY), 20) / 20;
	$: filterShadow = Math.min(Math.max(0, scrollY - 180), 25) / 25;
	// $: console.log(filterShadow, scrollY);
	const isSticky = (offset) => {
		return scrollY > offset;
	};
</script>

<MainScreenLayoutBase>
	<!-- <div class="absolute top-0 left-0 right-0 z-30">
		<HeaderBar />
	</div> -->

	<div
		class=" overflow-y-auto overflow-x-hidden  md:mx-auto md:max-w-3xl h-screen pb-16 relative  z-20 "
		on:scroll={(e) => {
			scrollY = e.currentTarget.scrollTop;
		}}
	>
		<div
			class="p-4 flex flex-row justify-between sticky top-0 z-30 bg-slate-100 "
			style="
					box-shadow: 0 4px 6px -1px rgb(0 0 0 / {0.1 * titleShadow}), 0 2px 4px -2px rgb(0 0 0 / {0.1 *
				titleShadow});
					--tw-bg-opacity: {titleShadow}
				"
		>
			<div class="font-semibold text-xl font-serif">Challenges</div>
			<div>
				<SearchButton
					path="#"
					onClick={(e) => {
						console.log('search');
					}}
				/>
			</div>
		</div>
		<div class="px-4">
			<HeroCard />
		</div>
		<!-- Filter -->
		<div class="sticky top-12 z-30">
			<div
				class=" select-none flex flex-row justify-start gap-4 items-center mt-4 h-12  md:mx-auto md:max-w-3xl px-4 flex-nowrap overflow-x-auto bg-slate-100 ring-opacity-100 "
				style="
					box-shadow: 0 4px 6px -1px rgb(0 0 0 / {0.1 * filterShadow}), 0 2px 4px -2px rgb(0 0 0 / {0.1 *
					filterShadow});
					--tw-bg-opacity: {Math.min(Math.max(0, scrollY - 100), 25) / 25}
				"
			>
				<div
					class="  rounded-full {filter.length ? 'text-storm-dark' : 'text-storm-light'}"
					on:click={() => (filter = [])}
				>
					<FilterIcon filled={!!filter.length} />
				</div>
				{#each tagList as tag}
					<div
						on:click={() => addFilterTag(tag)}
						class="text-sm whitespace-nowrap px-4 py-2 rounded-full  cursor-pointer select-none {filter.includes(
							tag
						)
							? 'bg-water border-0 text-white font-bold'
							: 'bg-gray-200 border border-storm-light text-storm'}"
					>
						{tags[tag]}
					</div>
				{/each}
			</div>
		</div>
		<!-- Challenges -->

		{#if filter.length > 0}
			<div class="container__filter min-h-content ">
				{#each data as challenge}
					<ChallengeCard {challenge} topics={tags} tags={topics} {filter} />
				{/each}
			</div>
		{:else}
			<div class="container min-h-content overflow-visible">
				{#each topicList as topic}
					<div class="">
						<!-- get the nice, readable topic title-->
						<div class="text-lg font-light font-serif px-4">{topics[topic]}</div>
						<div
							class="py-2 grid grid-flow-col gap-4 overflow-x-scroll px-4 h-scroller snaps-inline"
							style="
								grid-auto-columns: 6rem;
								grid-template-rows: 8rem;
							"
						>
							{#each data as challenge}
								{#if challenge.tags.includes(topic)}
									<ChallengeCard {challenge} topics={tags} tags={topics} {filter} />
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</MainScreenLayoutBase>

<style lang="scss">
	.overflow-inherit {
		overflow: inherit;
	}
	.container {
		max-width: 768px;
		margin: auto;
		display: grid;
		grid-auto-flow: row dense;
		grid-auto-rows: minmax(100px, max-content);
		grid-template-columns: repeat(1, minmax(0, 1fr));
		// overflow-y: auto;
		padding: 0rem 0rem 0rem 0rem;
		// : 1rem;
		gap: 1rem;
	}

	.container__filter {
		max-width: 768px;
		margin: auto;
		display: grid;
		grid-auto-flow: row dense;
		grid-auto-rows: minmax(100px, max-content);
		grid-template-columns: repeat(2, minmax(0, 1fr));
		// overflow-y: auto;
		padding: 1rem;
		gap: 1rem;
	}

	.h-scroller {
		overscroll-behaviour-inline: contain;
	}

	.snaps-inline {
		scroll-snap-type: inline mandatory;
		scroll-padding-inline: 1rem;
	}

	.snaps-inline > * {
		scroll-snap-align: start;
	}

	// .stuck {
	// 	@apply bg-slate-100;
	// }
</style>
