<script lang="ts">
	import { goto } from '$app/navigation';

	import { nkReady } from '$lib/client';
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import ChallengeJournalCard from '$lib/components/journal/challenge-journal-card.svelte';
	import { getChallengeBySlug } from '$lib/services/challenge-content';
	import {
		getAcceptedChallenges,
		getBookmarkedChallenges,
		getCompletedChallenges
	} from '$lib/services/challenge-storage';
	import { fade, scale } from 'svelte/transition';

	let activeChallenge = [];

	nkReady.subscribe(async (value) => {
		if (value) {
			let { interactions, cursor } = await getCompletedChallenges();
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
	class="px-4 py-4"
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
		<div class="min-h-full px-4">
			<svg
				class="w-full h-full mx-auto mr-4 text-storm-light rotate-6"
				viewBox="0 0 76 76"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M37.9997 69.6663C50.2198 69.6663 60.1663 59.7198 60.1663 47.4997C60.1663 35.2795 50.2198 25.333 37.9997 25.333C25.7763 25.333 15.833 35.2795 15.833 47.4997C15.833 59.7198 25.7763 69.6663 37.9997 69.6663ZM37.9997 31.6663C46.7302 31.6663 53.833 38.7692 53.833 47.4997C53.833 56.2302 46.7302 63.333 37.9997 63.333C29.2692 63.333 22.1663 56.2302 22.1663 47.4997C22.1663 38.7692 29.2692 31.6663 37.9997 31.6663ZM34.833 6.33301H22.1663V23.8067C25.9558 21.2709 30.3008 19.6861 34.833 19.1865V6.33301ZM53.833 6.33301H41.1663V19.1865C45.6985 19.6861 50.0435 21.2709 53.833 23.8067V6.33301Z"
					fill="currentColor"
				/>
				<path
					d="M31.7265 50.0678L30.2445 58.7002L37.9997 54.6247L45.7549 58.7002L44.2729 50.0678L50.5492 43.9498L41.8789 42.6895L37.9997 34.833L34.1205 42.6895L25.4502 43.9498L31.7265 50.0678Z"
					fill="currentColor"
				/>
			</svg>

			<div class="text-center font-serif font-semibold py-4">
				Du hast keine abgeschlossenen Challenges!
			</div>
			<ButtonPrimaryCta onClick={() => goto('/challenges')}>Nimm dir welche vor</ButtonPrimaryCta>
		</div>
	{/if}
</div>
