<script lang="ts" context="module">
	export async function load({ params, fetch, session, stuff }) {
		return {
			status: 200,
			props: {
				challenge: await getChallengeBySlug(params.slug)
			}
		};
	}
</script>

<script lang="ts">
	import RewardDisplay2 from '../../../lib/components/challenge/RewardDisplay2.svelte';

	import { goto, prefetch } from '$app/navigation';
	import { page } from '$app/stores';
	import { nkReady } from '$lib/client';
	import ChallengeActions from '$lib/components/challenge/challenge-actions.svelte';
	import RecommendedChallengesSection from '$lib/components/challenge/recommended-challenges-section.svelte';
	import ShareToSocialMediaSection from '$lib/components/challenge/share-to-social-media-section.svelte';
	import DifficultyCard from '$lib/components/difficulty-card.svelte';
	import {
		getChallengeState,
		getLastCompletion,
		getTopicBigointChallengeState,
		type ChallengeAccept,
		type ChallengeBookmark,
		type ChallengeComplete,
		type ChallengeInteractionType,
		type ChallengeReject
	} from '$lib/services/challenge-storage';
	import { headerImageUrl, headerState } from '$lib/stores/header-store';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { fade, slide } from 'svelte/transition';
	import { LocalDateTime } from '$lib/services/luxon-proxy';
	import { DateTime } from 'luxon';
	import RewardDisplay from '$lib/components/challenge/reward-display.svelte';
	import ChallengeV2Todos from '$lib/components/challenge/ChallengeV2Todos.svelte';
	import { getContext, hasContext, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import SuperChallengeIcon from '$lib/components/impact/super-challenge-icon.svelte';
	import {
		getSuperChallengeCssClassForInteracion,
		getSuperChallengeDataForLeadChallenge
	} from '$lib/components/impact/super-challenge';
	import { getChallengeBySlug } from '$lib/services/challenge-content';
	import { getImageUrlFromChallenge } from '$lib/util';
	import CollapsableHtmlView from '$lib/components/collapsable-html-view.svelte';
	import Confetti from '$lib/components/particles/confetti.svelte';
	export let challenge: ChallengeV2;
	console.log('Challenge:', challenge);
	let challengeState: ChallengeBookmark | ChallengeAccept | ChallengeReject | ChallengeComplete;
	let challengeStateType: ChallengeInteractionType;
	let showMore = false;

	const back = () => {
		if (showMore) {
			showMore = false;
			goto($page.url.pathname, { replaceState: true });
		} else {
			history.back();
		}
	};
	headerImageUrl.set(getImageUrlFromChallenge(challenge));
	headerState.set({
		backbutton: true,
		title: challenge.title,
		hidden: false,
		transparent: true,
		back
	});

	let selectedDifficulty: string;
	const selectDifficulty = (difficulty: string) => {
		if (selectedDifficulty === difficulty) {
			selectedDifficulty = undefined;
		} else {
			selectedDifficulty = difficulty;
		}
	};

	let addedPlus = false;
	const addPlus = (added: string) => {
		addedPlus = !!!addedPlus;
	};

	const action = async (nextRoute) => {
		const route = `/challenge/${challenge.slug}/${nextRoute}`;
		await prefetch(route);

		goto(route);
	};

	nkReady.subscribe(async (val) => {
		if (val) {
			challengeState = await getChallengeState(challenge.slug);
			console.log('challengeState', challengeState);
		}
	});

	let playAt = (e) => console.log(e);

	const refetch = async () => {
		if ($nkReady) {
			challengeState = await getChallengeState(challenge.slug);
			console.log('challengeState', challengeState);
		}
	};

	let showBigpointReminder = false;

	let numCompletions, medals;
	$: {
		numCompletions = challengeState?.completions?.length ?? 0;
		medals = challenge.type === 'recurring' ? Math.floor(numCompletions / 6) : numCompletions;
		console.log('medals', medals);
		console.log(!getTopicBigointChallengeState(challenge.topic));
	}

	const scrollPosition: Writable<number> = hasContext('scrollPosition')
		? getContext('scrollPosition')
		: writable(0);
	export let actionsOffsetStart = 440;
	export let actionsOffsetEnd = 40;

	let actionsShadow = 0;
	$: {
		actionsShadow =
			Math.min(Math.max(0, $scrollPosition - actionsOffsetStart), actionsOffsetEnd) /
			actionsOffsetEnd;

		if ($scrollPosition > 480) {
			headerState.update((headerState) => ({ ...headerState, transparent: true }));
		}
	}

	onMount(async () => {
		showBigpointReminder =
			challenge.impact === 'peanut' && !(await getTopicBigointChallengeState(challenge.topic));
	});
</script>

<div transition:fade={{ duration: 250 }}>
	<Confetti id="challenge_accept_particles" bind:playAt />

	<!-- header image-->
	<!-- <div
		class=" h-64 bg-red-500 w-full ch-card shadow-nature "
		style={`background: url( ${
			data.image?.file?.path
				? $page.url.origin + '/' + data.image?.file?.path
				: 'https://picsum.photos/1000'
		}); background-size: cover;`}
	/> -->
	<div class="space-y-8">
		<!-- title -->

		<div class="text-4xl font-bold font-serif mx-4 my-4 text-black ">
			{challenge.title}
		</div>

		<div>
			{#if challenge.lead}
				<div class="mx-4 my-4 display flex flex-row items-center gap-3">
					<div>
						{#await getSuperChallengeDataForLeadChallenge(challenge.slug) then superChallenge}
							<SuperChallengeIcon
								{superChallenge}
								cssClass={getSuperChallengeCssClassForInteracion(challengeState)}
							/>
						{/await}
					</div>
					<div class=" font-bold font-serif text-storm-dark ">Super-Challenge</div>
				</div>
			{/if}

			<!-- completions -->
			{#if challengeState && (challengeState.type === 'complete' || (challengeState.type === 'accept' && challengeState.completions?.length > 0))}
				<RewardDisplay2 {medals} lastCompleted={getLastCompletion(challengeState).toRelative()} />
			{/if}
		</div>

		<!-- TODO figure out if we want a reminder to do the bigpoint first -->
		{#if showBigpointReminder}
			<div class="bg-water2-light rounded-md shadow-md p-4 relative mx-4" out:slide>
				<button class="absolute top-0 right-2" on:click={() => (showBigpointReminder = false)}
					>x</button
				>
				Hey, du hast den Bigpoint in diesem Bereich nicht angenommen. Mach doch erstmal den!
			</div>
		{/if}

		<!-- front matter -->
		<p class="text-lg  prose mx-4">
			{@html challenge.frontMatter}
		</p>

		<!-- actions -->
		<div class=" top-0 bg-slate-100 min-w-full px-4 pt-4 z-50 -mt-8">
			<ChallengeActions
				{challenge}
				nextState={action}
				bind:challengeState
				bind:challengeStateType
				{refetch}
			/>
		</div>

		<div class="mx-4">
			{#if !challengeState || challengeState.type !== 'accept'}
				<!-- steps -->
				{#if challenge.difficulties['easy']}
					<div class="">
						<DifficultyCard
							difficulty={challenge.difficulties['easy']}
							name="Todos"
							onSelected={() => {}}
							selected
						/>
					</div>
				{:else if challenge.difficulties['medium']}
					<div class="">
						<DifficultyCard
							difficulty={challenge.difficulties['medium']}
							name="Todos"
							onSelected={() => {}}
							selected
						/>
					</div>
				{:else if challenge.difficulties['hard']}
					<div class="">
						<DifficultyCard
							difficulty={challenge.difficulties['hard']}
							name="Todos"
							onSelected={() => {}}
							selected
						/>
					</div>
				{/if}
			{/if}
		</div>

		<!-- todos for currently accepted challenge-->
		<div class="mx-4">
			<ChallengeV2Todos
				{challenge}
				{challengeState}
				bind:playAt
				interactable={challengeState && challengeState.type === 'accept'}
			/>
		</div>

		<!-- more infos -->

		{#if challenge.summary}
			<CollapsableHtmlView
				content={challenge.summary}
				collapsed={false}
				canCollapse={false}
				title="Warum"
			/>
		{/if}
		{#if challenge.tips}
			<CollapsableHtmlView
				content={challenge.tips}
				collapsed={!!challengeState || (challengeState && challengeState.type !== 'accept')}
				canCollapse={!!challengeState}
				title="Tips"
			/>
		{/if}

		{#if challenge.content}
			<CollapsableHtmlView
				content={challenge.content}
				collapsed={!!challengeState || (challengeState && challengeState.type !== 'accept')}
				canCollapse={!!challengeState}
				title="Mehr"
			/>
		{/if}
		<!-- <div class="mx-4 rounded-xl p-2 bg-white">
			<p class="text-center font-bold text-xl pb-2">Mehr</p>
			{#if !challengeState || challengeState.type !== 'accept'}
				<p class="align-middle text-md pb-2">
					{challenge.content}
				</p>
			{:else}
				<p class="align-middle text-md pb-2">
					{challenge.content}
				</p>
			{/if}
		</div> -->
	</div>
	<!-- related challenges -->
	<RecommendedChallengesSection {challenge} />

	<!-- share to social media -->
	<ShareToSocialMediaSection {challenge} last />
</div>
