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
	import ScoreSection from '$lib/components/challenge/congratulation-section.svelte';
	export let challenge: ChallengeV2;
</script>

<div class="flex flex-col pt-8">
	<div>
		<form class="mt-8 mx-3">
			<label class=" block" for="name">Name von deinen Freund:innen:</label>
			<input type="text" class="w-full  rounded-md" name="name" >
	
			<label class="block w-full " for="email">Email von deinen Freund:innen:</label>
			<input type="text" class="w-full  rounded-md" name="email" >
			
	
			<button class="btn rounded-full mt-4 bg-sky-400 py-2  mx-auto w-full cursor-auto focus:bg-sky-300 hover:bg-sky-300" on:click={() => alert('eingeladen')}>
				Freund einladen
			</button>
		</form>
	</div>
	<ShareToSocialMediaSection {challenge} index={0} last />
</div>
