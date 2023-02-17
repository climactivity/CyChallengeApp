<script lang="ts" context="module">
	import { availableTags, availableTopics } from '$testData/challenges';
	export async function load({ params, fetch, session, stuff }) {
		return {
			status: 200,
			props: {
				// tags: availableTags,
				// tagList: Object.keys(availableTags),
				// topics: availableTopics,
				// topicList: Object.keys(availableTopics)
				tags: availableTopics,
				tagList: Object.keys(availableTopics),
				topics: availableTags,
				topicList: Object.keys(availableTags)
			}
		};
	}
</script>

<script lang="ts">
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { scale } from 'svelte/transition';

	let insets: Writable<any> = getContext('insets');

	import ChallengeCard from '$lib/components/challenge/challenge-card.svelte';
	import ChallengeScrollerSkeleton from '$lib/components/challenge/challenge-scroller-skeleton.svelte';
	import ChallengeScroller from '$lib/components/challenge/ChallengeScroller.svelte';
	import FilterIcon from '$lib/components/icons/filter-icon.svelte';
	import HeroCard from '$lib/components/monthly-challenge/hero-card.svelte';
	import ProportionalHeader from '$lib/components/proportional-header.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';
	import { pb } from '$lib/pb-client';
	import { getChallenges } from '$lib/services/challenge-content';
	import { headerState } from '$lib/stores/header-store';
	import { Capacitor } from '@capacitor/core';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import GlowAnimation from '$lib/animations/glow-animation.svelte';
	headerState.set({
		backbutton: false,
		title: 'Challenges',
		hidden: false
	});

	let data: Promise<ChallengeV2[]> = getChallenges();
	export let topics;
	let topicList = pb.records.getFullList('topics');
	let filter = [];
	let showSuperChallenges = false;
	let tags = pb.records.getFullList('tags').then((tagRecords) => {
		let tagValues = {};
		tagRecords.forEach((value) => (tagValues[value.tag] = value.label));
		return tagValues;
	});
	let tagList = pb.records.getFullList('tags').then((tagRecords) => {
		return tagRecords;
	});
	console.log(tagList);
	const addFilterTag = (tag: string) => {
		filter = filter.includes(tag) ? filter.filter((item) => item !== tag) : [tag];
		if (filter.length > 0) {
			showSuperChallenges = false;
		}
	};

	const toggleFilterSuperChallenges = () => {
		showSuperChallenges = !showSuperChallenges;
		if (showSuperChallenges) {
			filter = [];
		}
	};

	const isHidden = (challenge: ChallengeV2) =>
		filter.length > 0 && !filter.every((r) => challenge.tags.includes(r));

	// $: console.log(data.length);

	let scrollY = 0;
	let filterShadow = 0,
		titleShadow = 0;
	$: filterShadow = Math.min(Math.max(0, scrollY - 180), 25) / 25;

	// onMount(() => console.log(topicList));

	// let challengeStates = getChallengeInteractionsUserData();
</script>

<MainScreenLayoutBase>
	<div
		class="absolute -top-24 -left-48 right-48 h-48 bg-nature-light bg-opacity-10 rounded-full blur-2xl"
	/>
	<div
		class="absolute -top-12 left-48 -right-48 h-24 bg-water2-light bg-opacity-20 rounded-full blur-2xl"
	/>
	<div
		class=" overflow-y-auto overflow-x-hidden  md:mx-auto md:max-w-3xl h-safe pb-16 relative  z-20 "
		on:scroll={(e) => {
			scrollY = e.currentTarget.scrollTop;
		}}
	>
		<ProportionalHeader
			backbutton={false}
			shadowOffsetStart={0}
			shadowOffsetEnd={20}
			transparent={false}
			title="Challenges"
			bind:scrollPosition={scrollY}
		>
			<!-- <SearchButton
				class="hidden"
				slot="action"
				path="#"
				onClick={(e) => {
					console.log('search');
				}}
			/> -->
		</ProportionalHeader>
		<div class="px-4">
			<HeroCard />
		</div>
		<!-- Filter -->
		<div
			class="sticky top-12 z-30 overflow-x-scroll bg-slate-100"
			style="
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / {0.1 * filterShadow}), 0 2px 4px -2px rgb(0 0 0 / {0.1 *
				filterShadow});
		--tw-bg-opacity: {Math.min(Math.max(0, scrollY - 100), 25) / 25}
	"
		>
			<div
				class="awful-ls-hack select-none flex flex-row justify-start gap-4 items-center mt-4 h-12  md:mx-auto md:max-w-3xl px-4 flex-nowrap   bg-slate-100 ring-opacity-100 
				overflow-x-scroll
				overflow-y-clip"
			>
				<div
					class="  rounded-full {filter.length || showSuperChallenges
						? 'text-storm-dark'
						: 'text-storm-light'}"
					on:click={() => (filter = [])}
				>
					<FilterIcon filled={!!filter.length || showSuperChallenges} />
				</div>
				<div class="relative" on:click={toggleFilterSuperChallenges}>
					{#if showSuperChallenges}
						<div
							class="awful-ls-hack transition relative font-sans text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer select-none  border 
								 bg-nature  text-white font-bold"
							title="Super Challenges"
						>
							Super Challenges
						</div>
					{:else}
						<GlowAnimation
							glow_animation_duration="7s"
							glow_opacity={0.6}
							glow_corner_radius="full"
							glow_blur_radius="2.5px"
						>
							<div
								class="awful-ls-hack transition relative font-sans text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer select-none  border 
								bg-gray-50 border-storm-light text-storm bg-opacity-85 rounde"
								title="Super Challenges"
							>
								Super Challenges
							</div>
						</GlowAnimation>
					{/if}
				</div>
				{#await tagList}
					<div
						class=" awful-ls-hack transition font-sans text-sm whitespace-nowrap px-4 py-2 rounded-full  cursor-pointer select-none 
					 bg-storm-light border border-storm-light text-storm w-56 h-[80%] animate-pulse"
					>
						&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
					<div
						class=" awful-ls-hack transition font-sans text-sm whitespace-nowrap px-4 py-2 rounded-full  cursor-pointer select-none 
					 bg-storm-light border border-storm-light text-storm w-56 h-[80%] animate-pulse"
					>
						&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
				{:then tagListResolved}
					{#each tagListResolved as tag}
						<div
							on:click={() => addFilterTag(tag.tag)}
							class=" awful-ls-hack transition font-sans text-sm whitespace-nowrap px-4 py-2 rounded-full  cursor-pointer select-none {filter.includes(
								tag.tag
							)
								? 'bg-water border-0 text-white font-bold'
								: 'bg-gray-50 border border-storm-light text-storm'}"
							title={tag.label}
						>
							{tag.label}
						</div>
					{/each}
				{/await}
			</div>
		</div>
		<!-- Challenges -->

		{#if filter.length > 0}
			{#await data then challenges}
				{#key filter}
					<div class="container__filter min-h-content ">
						{#each challenges as challenge}
							<ChallengeCard {challenge} {tags} {isHidden} />
						{/each}
					</div>
				{/key}
			{/await}
		{:else if showSuperChallenges}
			{#await data then challenges}
				<div class="container__filter min-h-content ">
					{#each challenges.filter((challenge) => challenge.lead) as challenge}
						<ChallengeCard {challenge} {tags} {isHidden} />
					{/each}
				</div>
			{/await}
		{:else}
			<div class="container min-h-content overflow-visible">
				{#await topicList}
					<ChallengeScrollerSkeleton length={3} />
					<ChallengeScrollerSkeleton length={3} />
					<ChallengeScrollerSkeleton length={3} />
					<ChallengeScrollerSkeleton length={3} />
					<ChallengeScrollerSkeleton length={3} />
				{:then topicListResolved}
					{#each topicListResolved as topic}
						{#await data}
							<ChallengeScrollerSkeleton title={topic.label} length={3} />
						{:then fetchedChallenges}
							<ChallengeScroller
								challenges={fetchedChallenges.filter(
									(challenge) => challenge.topic === topic.topic
								)}
								title={topic.label}
								{tags}
								challengeHidden={(_) => false}
								pad
							/>
						{/await}
					{/each}
				{/await}
			</div>
		{/if}

		{#if Capacitor.getPlatform() === 'ios'}
			<div class="h-20 findme " />
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
		grid-auto-rows: minmax(200px, max-content);
		grid-template-columns: minmax(0, 1fr);
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

	.awful-ls-hack ::before {
		content: attr(title);
		display: block;
		font-weight: bold;
		height: 0;
		overflow: hidden;
		visibility: hidden;
		// color: #adc765;
	}

	// .stuck {
	// 	@apply bg-slate-100;
	// }
</style>
