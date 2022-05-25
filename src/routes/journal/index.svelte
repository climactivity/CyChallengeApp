<script lang="ts" context="module">
	import { acceptedChallenges } from '$testData/accepted-challenges';
	export async function load({ params, fetch, session, stuff }) {
		return {
			status: 200,
			props: {
				data: acceptedChallenges
			}
		};
	}
</script>

<script lang="ts">
	import JournalChallengeCard from '$lib/components/JournalChallengeCard.svelte';
	import type { AcceptedChallenge } from '$lib/types/challenges';

	import { headerState } from '$lib/stores/header-store';

	headerState.set({
		backbutton: false,
		title: 'Journal',
		hidden: false
	});

	export let data: AcceptedChallenge[];
</script>

<div class="grid grid-flow-row gap-4">
	{#each data as acceptedChallenge}
		<JournalChallengeCard {acceptedChallenge} />
	{/each}
</div>
