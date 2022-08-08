<script lang="ts" context="module">
	import { availableChallenges } from '$testData/challenges';

	export async function load({ params, fetch, session, stuff }) {
		let challenge = availableChallenges.find((challenge) => challenge.slug === params.slug);
		return {
			status: 200,
			props: {
				challenge: challenge
			}
		};
	}
</script>

<script lang="ts">
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
	import { headerState } from '$lib/stores/header-store';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { fade } from 'svelte/transition';
	import { LocalDateTime } from '$lib/services/luxon-proxy';
	import { DateTime } from 'luxon';
	export let challenge: ChallengeV2;
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
		goto(route, { noscroll: true });
	};

	nkReady.subscribe(async (val) => {
		if (val) {
			challengeState = await getChallengeState(challenge.slug);
			console.log('challengeState', challengeState);
		}
	});

	let playAt;

	const refetch = async () => {
		if ($nkReady) {
			challengeState = await getChallengeState(challenge.slug);
			console.log('challengeState', challengeState);
		}
	};

	let showBigpointReminder =
		challenge.impact === 'peanut' && getTopicBigointChallengeState(challenge.topic);
</script>

<div class="pb-16" transition:fade={{ duration: 250 }}>
	<!-- <Confetti id="challenge_accept_particles" bind:playAt /> -->

	<!-- header image-->
	<!-- <div
		class=" h-64 bg-red-500 w-full ch-card shadow-nature "
		style={`background: url( ${
			data.image?.file?.path
				? $page.url.origin + '/' + data.image?.file?.path
				: 'https://picsum.photos/1000'
		}); background-size: cover;`}
	/> -->
	<div class="p-4 m-4 space-y-8">
		<!-- title -->

		<div class="text-xl font-bold font-serif">
			{challenge.title}
		</div>

		<!-- TODO figure out if we want a reminder to do the bigpoint first -->
		{#if showBigpointReminder}
			<div class="bg-water2-light rounded-md shadow-md p-4 relative">
				<button class="absolute top-0 right-2">x</button>
				Hey, du hast den Bigpoint in diesem Bereich nicht angenommen. Mach doch erstmal den!
			</div>
		{/if}

		<!-- front matter -->
		<p class="text-lg  prose">
			{challenge.frontMatter}
		</p>

		<!-- completions -->
		{#if challengeState && (challengeState.type === 'complete' || (challengeState.type === 'accept' && challengeState.completions?.length > 0))}
			<div>
				Zuletzt geschaft {getLastCompletion(challengeState).toRelative()}
			</div>
		{/if}

		<!-- actions -->
		<ChallengeActions
			{challenge}
			nextState={action}
			bind:challengeState
			bind:challengeStateType
			{refetch}
		/>

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
		<!-- more infos -->

		<div class=" rounded-xl p-2 bg-white">
			<p class="text-center font-bold text-xl pb-2">Mehr</p>
			<p class="align-middle text-md pb-2">
				{challenge.content}
			</p>
		</div>
	</div>
	<!-- related challenges -->
	<RecommendedChallengesSection {challenge} />

	<!-- share to social media -->
	<ShareToSocialMediaSection {challenge} last />
</div>
