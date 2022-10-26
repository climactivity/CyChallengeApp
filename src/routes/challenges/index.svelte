<script lang="ts" context="module">
	import {
		availableChallenges,
		availableTags,
		availableTopics,
		challenges
	} from '$testData/challenges';
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
	import type { AcceptedChallenge, ChallengeV2 } from '$lib/types/challenges';
	import { fly, scale, slide } from 'svelte/transition';

	let insets: Writable<any> = getContext('insets');

	import { headerState } from '$lib/stores/header-store';
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
	import ProportionalHeader from '$lib/components/proportional-header.svelte';
	import ChallengeScroller from '$lib/components/challenge/ChallengeScroller.svelte';
	import { getChallengeInteractionsUserData } from '$lib/services/challenge-storage';
	import { Capacitor } from '@capacitor/core';
	import { getChallenges } from '$lib/services/challenge-content';
	import ChallengeScrollerSkeleton from '$lib/components/challenge/challenge-scroller-skeleton.svelte';
	import { tutorialStore } from '$lib/stores/onboarding-store';
	import { pb } from '$lib/pb-client';
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
	export let tags = {
		big_point: 'Big Point',
		easy_action: 'Easy Action',
		save_money: 'Save Money',
		empty_tag: 'Empty Tag'
	};
	let tagList = pb.records.getFullList('tags');

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

	$: console.log(data.length);

	let scrollY = 0;
	let filterShadow = 0,
		titleShadow = 0;
	$: filterShadow = Math.min(Math.max(0, scrollY - ($tutorialStore ? 0 : 180)), 25) / 25;

	onMount(() => console.log(topicList));

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
			shadowOffsetStart={$tutorialStore ? 20 : 0}
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
		<div class="sticky top-12 z-30">
			<div
				class="awful-ls-hack select-none flex flex-row justify-start gap-4 items-center mt-4 h-12  md:mx-auto md:max-w-3xl px-4 flex-nowrap overflow-x-scroll  bg-slate-100 ring-opacity-100 "
				style="
					box-shadow: 0 4px 6px -1px rgb(0 0 0 / {0.1 * filterShadow}), 0 2px 4px -2px rgb(0 0 0 / {0.1 *
					filterShadow});
					--tw-bg-opacity: {Math.min(Math.max(0, scrollY - ($tutorialStore ? 0 : 100)), 25) / 25}
				"
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
					{#if !showSuperChallenges}
						<div
							transition:scale
							class="absolute w-full h-full font-sans text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer select-none bg-gradient-to-r to-nature-light from-water2-light blur-sm animate-tiltGradient"
						/>
					{/if}
					<div
						class="awful-ls-hack transition relative font-sans text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer select-none  border 
					{showSuperChallenges
							? 'bg-gradient-to-r to-nature from-water2 text-white font-bold'
							: 'bg-gray-50 border-storm-light text-storm bg-opacity-85'}"
						title="Super Challenges"
					>
						Super Challenges
					</div>
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
	}

	// .stuck {
	// 	@apply bg-slate-100;
	// }
</style>
