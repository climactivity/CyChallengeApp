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
		class=" h-48 bg-red-500 w-full header-img  "
		style={`background-image: url( ${$headerImageUrl}); `}
	/>

	<slot />
</div>

<style lang="scss">
	.header-img {
		background: white;
		background-size: cover;
		border-radius: 0px 0px 0px 4rem;
		padding: 6px;
		box-shadow: inset 0rem -0.4rem 0px 0px rgba(0 0 0 / 0.3);

		scroll-snap-align: start;
	}
</style>
