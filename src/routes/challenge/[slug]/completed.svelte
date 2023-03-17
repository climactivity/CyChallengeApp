<script lang="ts" context="module">
	import { getChallengeBySlug } from '$lib/services/challenge-content';

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
	import VSection from '$lib/components/challenge/v-section.svelte';
	import ActionHeroSection from '$lib/components/challenge/action-hero-section.svelte';
	import type { ChallengeV2, Difficulty } from '$lib/types/challenges';
	import BackToChallengesPageSection from '$lib/components/challenge/back-to-challenges-page-section.svelte';
	import RecommendedChallengesSection from '$lib/components/challenge/recommended-challenges-section.svelte';
	import ShareToSocialMediaSection from '$lib/components/challenge/share-to-social-media-section.svelte';
	import CongratulationSection from '$lib/components/challenge/congratulation-section.svelte';
	import RewardSection from '$lib/components/challenge/reward-section.svelte';
	import { nkReady } from '$lib/client';
	import { currentLevelForChallenge, getChallengeState } from '$lib/services/challenge-storage';
	import { challenges } from '$testData/challenges';
	import ContinueSection from '$lib/components/challenge/continue-section.svelte';
	export let challenge: ChallengeV2;
	let challengeState;
	let level: Difficulty;
	nkReady.subscribe(async (val) => {
		if (val) {
			challengeState = await getChallengeState(challenge.slug);
			console.log('challengeState', challengeState);
			let currentLevel = currentLevelForChallenge(challenge, challengeState);
			level = challenge.difficulties[currentLevel];
			console.log(level);
		}
	});
</script>

<div class="flex flex-col pt-8">
	<CongratulationSection {challenge} {challengeState} index={0} />
	<!-- <RewardSection {challenge} {challengeState} index={1} /> -->
	{#if level}
		{#if level.upgradeText}
			<div class="prose px-4">
				{@html level.upgradeText}
			</div>
		{:else}
			<div class="prose px-4">Generischer Levelup Text</div>
		{/if}
	{/if}
	<ContinueSection {challenge} {challengeState} index={2} />
	<ShareToSocialMediaSection {challenge} index={5} />
	<RecommendedChallengesSection {challenge} index={4} />
	<BackToChallengesPageSection last={true} index={5} />
</div>
