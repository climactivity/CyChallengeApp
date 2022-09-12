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
	import ShareToSocialMediaSection from '$lib/components/challenge/share-to-social-media-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
</script>

<div class="flex flex-col pt-8">
	invite screen here
	<ShareToSocialMediaSection {challenge} index={0} last />
</div>
