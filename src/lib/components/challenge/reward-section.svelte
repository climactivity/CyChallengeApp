<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeAccept, ChallengeComplete } from '$lib/services/challenge-storage';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
	export let challengeState: ChallengeComplete | ChallengeAccept;

	let lastCompletion, numCompletions;
	$: {
		if (challengeState) {
			lastCompletion =
				challengeState && challengeState.completions
					? challengeState.completions[challengeState.completions.length - 1]
					: undefined;

			numCompletions =
				challengeState && challengeState.completions
					? challengeState.completions.length
					: challengeState.type === 'complete'
					? 1
					: 0;
			console.log(challenge, challengeState, lastCompletion);
		}
	}
</script>

<VSection {...$$props}>
	<div class="flex flex-col gap-4">
		<!-- <div class="text-storm-dark text-xl font-semibold ">Vom "{challenge.title}" hast du dir:</div> -->

		{#if challenge.type === 'recurring'}
			{#if numCompletions % 6 !== 0}
				{numCompletions % 6} / 6 bis zur nächsten Auszeichnung
			{/if}

			<!-- <div class="flex flex-row w-full justify-end px-2 text-water2-dark font-semibold font-sans ">
				<button on:click|preventDefault={(e) => console.log('lieber nicht')}> Lieber nicht </button>
			</div> -->
		{/if}
	</div>
</VSection>
