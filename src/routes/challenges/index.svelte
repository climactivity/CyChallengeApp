<script lang="ts" context="module">
	import { availableChallenges, availableTags, availableTopics } from '$testData/challenges';
	export async function load({ params, fetch, session, stuff }) {
		return {
			status: 200,
			props: {
				data: availableChallenges,
				tags: availableTags,
				topics: availableTopics
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
	headerState.set({
		backbutton: false,
		title: 'Card Demo',
		hidden: false
	});

	export let data: ChallengeV2[];

	let filter = [];

	export let tags = {
		big_point: 'Big Point',
		easy_action: 'Easy Action',
		save_money: 'Save Money',
		empty_tag: 'Empty Tag'
	};

	// get tag name from tags
	const getTagName = (tag: string) => {
		return tags[tag];
	};

	const addFilterTag = (tag: string) => {
		filter = filter.includes(tag) ? filter.filter((item) => item !== tag) : [...filter, tag];
	};

	$: console.log(filter);

	let playAt;

	let _navIndex = 100;
	let offset = 200;

	let scrollY = 0;
	let filterShadow = 0,
		titleShadow = 0;
	$: titleShadow = Math.min(Math.max(0, scrollY), 20) / 20;
	$: filterShadow = Math.min(Math.max(0, scrollY - 180), 25) / 25;
	$: console.log(filterShadow, scrollY);
	const isSticky = (offset) => {
		return scrollY > offset;
	};
</script>

<div class="relative" style="margin-top: {$insets.top}px">
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
				{#each Object.keys(tags) as tag}
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
		<div class="container min-h-screen">
			{#each data as challenge}
				<ChallengeCard {challenge} {tags} {filter} />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
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
	// .stuck {
	// 	@apply bg-slate-100;
	// }
</style>
