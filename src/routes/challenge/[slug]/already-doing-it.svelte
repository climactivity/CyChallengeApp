<script lang="ts" context="module">
	import { availableChallenges } from '$testData/challenges';

	export async function load({ params, fetch, session, stuff }) {
		let challenge = availableChallenges.find((challenge) => challenge.slug === params.slug);
		return {
			status: 200,
			props: {
				challenge
			}
		};
	}
</script>

<script lang="ts">
	import { nkReady } from '$lib/client';
	import BackToChallengesPageSection from '$lib/components/challenge/back-to-challenges-page-section.svelte';
	import CongratulationSection from '$lib/components/challenge/congratulation-section.svelte';
	import RecommendedChallengesSection from '$lib/components/challenge/recommended-challenges-section.svelte';
	import ShareToSocialMediaSection from '$lib/components/challenge/share-to-social-media-section.svelte';
	import { getChallengeState } from '$lib/services/challenge-storage';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
	let challengeState;
	nkReady.subscribe(async (val) => {
		if (val) {
			challengeState = await getChallengeState(challenge.slug);
			console.log('challengeState', challengeState);
		}
	});
</script>

<div class="flex flex-col pt-8">
	<CongratulationSection {challenge} {challengeState} index={0} skipped />
	<!-- <RewardSection {challenge} {challengeState} index={1} /> -->
	<RecommendedChallengesSection {challenge} index={1} />
	<ShareToSocialMediaSection {challenge} index={3} />
	<BackToChallengesPageSection last={true} index={4} />
</div>
