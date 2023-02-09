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
	import {
		getChallengeState,
		instanceOfChallengeAccept,
		instanceOfChallengeBookmark,
		instanceOfChallengeComplete,
		instanceOfChallengeReject
	} from '$lib/services/challenge-storage';
	export let data: ChallengeV2;

	let playAt;
	setContext('confetti', { ref: playAt });
	headerImageUrl.set(getImageUrlFromChallenge(data));
	headerState.set({
		backbutton: true,
		title: data.title,
		hidden: false,
		transparent: true
	});
	let challengeStatePromise = getChallengeState(data.slug);
</script>

<div class=" pb-20">
	<!-- <Confetti id="challenge_accept_particles" bind:playAt /> -->

	{#await challengeStatePromise}
		<div
			class=" h-48 bg-gray-50 w-full header-img  "
			style={`background-image: url( ${$headerImageUrl}); `}
		/>
	{:then challengeState}
		<div
			class=" h-48  w-full header-img  
			{instanceOfChallengeReject(challengeState) ? 'bg-red-500 shadow-red-500' : ''}
			{instanceOfChallengeBookmark(challengeState) ? 'bg-yellow-500 shadow-yellow-500' : ''}
			{instanceOfChallengeComplete(challengeState) ? 'bg-green-500 shadow-green-500' : ''}
			{instanceOfChallengeAccept(challengeState) ? 'bg-nature shadow-nature' : ''}   "
			style={`background-image: url( ${$headerImageUrl}); `}
		/>
	{/await}
	<!-- header image-->

	<slot />
</div>

<style lang="scss">
	.header-img {
		// background: white;
		background-size: cover;
		border-radius: 0px 0px 0px 4rem;
		padding: 6px;
		box-shadow: inset 0rem -0.4rem 0px 0px var(--tw-shadow-color, rgba(0 0 0 / 0.4));

		scroll-snap-align: start;
	}
</style>
