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
	import type { ChallengeV2 } from '$lib/types/challenges';
	import BackToChallengesPageSection from '$lib/components/challenge/back-to-challenges-page-section.svelte';
	import RecommendedChallengesSection from '$lib/components/challenge/recommended-challenges-section.svelte';
	import ShareToSocialMediaSection from '$lib/components/challenge/share-to-social-media-section.svelte';
	import CongratulationSection from '$lib/components/challenge/congratulation-section.svelte';
	import RewardSection from '$lib/components/challenge/reward-section.svelte';
	import { nkReady } from '$lib/client';
	import { currentLevelForChallenge, getChallengeState } from '$lib/services/challenge-storage';
	import { challenges } from '$testData/challenges';
	export let challenge: ChallengeV2;
	let challengeState;
	let level;
	nkReady.subscribe(async (val) => {
		if (val) {
			challengeState = await getChallengeState(challenge.slug);
			console.log('challengeState', challengeState);
			level = currentLevelForChallenge(challenge, challengeState);
			console.log(level);
		}
	});
</script>

<div class="flex flex-col pt-8">
	<CongratulationSection {challenge} index={0} />
	<RewardSection {challenge} {challengeState} index={1} />
	{#if level}
		<pre>
		{JSON.stringify(challenge.difficulties[level], null, 2)}
	</pre>
	{/if}
	<ShareToSocialMediaSection {challenge} index={5} />
	<RecommendedChallengesSection {challenge} index={4} />
	<BackToChallengesPageSection last={true} index={5} />
</div>
