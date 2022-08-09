<script lang="ts" context="module">
	import { availableChallenges, challenges } from '$testData/challenges';

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
	import VSection from '$lib/components/challenge/v-section.svelte';
	import ActionHeroSection from '$lib/components/challenge/action-hero-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import BackToChallengesPageSection from '$lib/components/challenge/back-to-challenges-page-section.svelte';
	import RecommendedChallengesSection from '$lib/components/challenge/recommended-challenges-section.svelte';
	import ShareToSocialMediaSection from '$lib/components/challenge/share-to-social-media-section.svelte';
	import CongratulationSection from '$lib/components/challenge/congratulation-section.svelte';
	import RewardSection from '$lib/components/challenge/reward-section.svelte';
	export let challenge: ChallengeV2;
</script>

<div class="flex flex-col pt-8">
	<CongratulationSection {challenge} index={0} skipped />
	<RewardSection {challenge} index={1} />
	<RecommendedChallengesSection {challenge} index={4} />
	<ShareToSocialMediaSection {challenge} index={5} />
	<BackToChallengesPageSection last={true} index={5} />
</div>
