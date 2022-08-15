<script lang="ts">
	import { goto } from '$app/navigation';
	import { customFly } from '$lib/animations/better-animation';

	import { nkReady } from '$lib/client';
	import ChallengeJournalCard from '$lib/components/journal/challenge-journal-card.svelte';
	import { getChallengeBySlug } from '$lib/services/challenge-content';
	import { getAcceptedChallenges, getBookmarkedChallenges } from '$lib/services/challenge-storage';
	import { fade, fly, scale, slide } from 'svelte/transition';

	let activeChallenge = [];

	nkReady.subscribe(async (value) => {
		if (value) {
			let { interactions, cursor } = await getBookmarkedChallenges();
			console.log('interactions', interactions);
			activeChallenge = await Promise.all(
				interactions.map(async (interaction) => {
					const challenge = await getChallengeBySlug(interaction.challengeSlug);
					return {
						interaction,
						challenge
					};
				})
			);
		}
	});
</script>

<div
	class="px-4 py-4 gap-4 grid grid-flow-row"
	in:scale={{ delay: 250, duration: 250, start: 0.8 }}
	out:scale={{ delay: 0, duration: 250, start: 0.8 }}
>
	{#if activeChallenge.length > 0}
		{#each activeChallenge as activeChallenge, i}
			<ChallengeJournalCard
				index={i}
				challenge={activeChallenge.challenge}
				challengeState={activeChallenge.interaction}
				onClick={() => {
					console.log('clicked');
					goto('/challenge/' + activeChallenge.challenge.slug);
				}}
			/>
		{/each}
	{:else}
		<div>empty state</div>
	{/if}
</div>
