<script lang="ts" context="module">
	import { availableChallenges, challenges } from '$testData/challenges';

	export async function load({ params, fetch, session, stuff }) {
		// let challenge = availableChallenges.find((challenge) => challenge.slug === params.slug);
		return {
			status: 200,
			props: {
				data: await getChallengeBySlug(params.slug)
			}
		};
	}
</script>

<script lang="ts">
	import Confetti from '$lib/components/particles/confetti.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { page } from '$app/stores';
	import { headerImageUrl, headerState } from '$lib/stores/header-store';
	import { getImageUrlFromChallenge } from '$lib/util';
	import { getChallengeBySlug } from '$lib/services/challenge-content';
	import { setContext } from 'svelte';

	export let data: ChallengeV2;
	let imageUrl = getImageUrlFromChallenge(data);

	let playAt;
	setContext('confetti', { ref: playAt });
	headerImageUrl.set(getImageUrlFromChallenge(data));
	headerState.set({
		backbutton: true,
		title: data.title,
		hidden: false,
		transparent: true
	});
</script>

<div class=" pb-20">
	<Confetti id="challenge_accept_particles" bind:playAt />

	<!-- header image-->
	<div
		class=" h-64 bg-red-500 w-full ch-card-sharp shadow-nature "
		style={`background: url( ${$headerImageUrl}); background-size: cover;`}
	/>

	<slot />
</div>
