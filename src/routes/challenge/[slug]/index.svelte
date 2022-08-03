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
		type ChallengeAccept,
		type ChallengeBookmark,
		type ChallengeComplete,
		type ChallengeInteractionType,
		type ChallengeReject
	} from '$lib/services/challenge-storage';
	import { headerState } from '$lib/stores/header-store';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { fade } from 'svelte/transition';

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

		<!-- front matter -->
		<p class="text-lg  prose">
			{challenge.frontMatter}
		</p>

		<!-- actions -->

		<ChallengeActions {challenge} nextState={action} bind:challengeState bind:challengeStateType />

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

<style lang="scss">
	.actions > * {
		align-self: start;
		:hover,
		:focus {
			outline: none;
		}
	}
</style>
