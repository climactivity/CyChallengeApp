<script lang="ts" context="module">
	import { acceptedChallenges } from '$testData/accepted-challenges';

	export async function load({ params, fetch, session, stuff }) {
		let challenge = acceptedChallenges.find((challenge) => challenge.slug === params.slug);

		return {
			status: 200,
			props: {
				data: challenge
			}
		};
	}
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { AcceptedChallenge, CompletedStep } from '$lib/types/challenges';

	import { headerState } from '$lib/stores/header-store';
</script>

<div class="h-20">
	{#if $headerState.transparent}
		<h1
			in:fly={{ y: -200, duration: 200 }}
			out:fly={{ y: -200, duration: 200 }}
			class="text-center mx-auto text-4xl font-bold font-sans"
		>
			<slot />
		</h1>
	{/if}
</div>
