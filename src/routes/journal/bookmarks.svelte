<script lang="ts">
	import { goto } from '$app/navigation';

	import { nkReady } from '$lib/client';
	import ChallengeJournalCard from '$lib/components/journal/challenge-journal-card.svelte';
	import { getChallengeBySlug } from '$lib/services/challenge-content';
	import { getAcceptedChallenges, getBookmarkedChallenges } from '$lib/services/challenge-storage';

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

<div class="px-4 py-4">
	{#each activeChallenge as activeChallenge}
		<ChallengeJournalCard
			challenge={activeChallenge.challenge}
			challengeState={activeChallenge.interaction}
			onClick={() => {
				console.log('clicked');
				goto('/challenge/' + activeChallenge.challenge.slug);
			}}
		/>
	{/each}
</div>
