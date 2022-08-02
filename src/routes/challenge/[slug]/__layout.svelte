<script lang="ts" context="module">
	import { availableChallenges, challenges } from '$testData/challenges';

	export async function load({ params, fetch, session, stuff }) {
		let challenge = availableChallenges.find((challenge) => challenge.slug === params.slug);
		return {
			status: 200,
			props: {
				data: challenge
			}
		};
	}
</script>

<script lang="ts">
	import Confetti from '$lib/components/particles/confetti.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { page } from '$app/stores';
	import { headerState } from '$lib/stores/header-store';

	export let data: ChallengeV2;
	headerState.set({
		backbutton: true,
		title: data.title,
		hidden: false,
		transparent: true
	});
	let playAt;
</script>

<div class=" ">
	<Confetti id="challenge_accept_particles" bind:playAt />

	<!-- header image-->
	<!-- <div
		class=" h-64 bg-red-500 w-full ch-card shadow-nature "
		style={`background: url( ${
			data.image?.file?.path
				? $page.url.origin + '/' + data.image?.file?.path
				: 'https://picsum.photos/1000'
		}); background-size: cover;`}
	/> -->

	<slot />
</div>
