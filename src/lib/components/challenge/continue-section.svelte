<script lang="ts">
	import { goto } from '$app/navigation';

	import VSection from '$lib/components/challenge/v-section.svelte';
	import {
		acceptChallenge,
		nextLevelForChallenge,
		type ChallengeAccept,
		type ChallengeComplete,
		type ChallengeInteraction
	} from '$lib/services/challenge-storage';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { onMount } from 'svelte';
	import ButtonPrimaryCta from '../buttons/button-primary-cta.svelte';
	import RecommendedChallengesSection from './recommended-challenges-section.svelte';
	import RewardDisplay from './reward-display.svelte';
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

	onMount(() => {
		console.log(challenge, challengeState, lastCompletion);
	});
</script>

<VSection {...$$props}>
	<div class="flex flex-col gap-4">
		<!-- <div class="text-storm-dark text-xl font-semibold ">Vom "{challenge.title}" hast du dir:</div> -->
		{#if challenge.type === 'recurring' && numCompletions % 6 !== 0}
			<ButtonPrimaryCta
				onClick={(e) => {
					console.log('contiune');
					goto('/challenge/' + challenge.slug);
				}}
			>
				Weiter so
			</ButtonPrimaryCta>
		{:else if nextLevelForChallenge(challenge, challengeState)}
			<div class="prose text-lg text-storm-dark">
				<!-- TODO add support for texts based on the difficulty of the selected challenge and if there is another difficulty level -->
				{#if false}
					{challenge.impact}
				{:else}
					Super, diese Challenge gibt es auch noch in wirksamer
				{/if}
			</div>
			<ButtonPrimaryCta
				onClick={async (e) => {
					console.log('increase level');
					let newDifficulty = nextLevelForChallenge(challenge, challengeState);

					let result = await acceptChallenge(challenge, newDifficulty);
					console.log('upgrade ', newDifficulty, result);
				}}
			>
				Einsatz erhöhen
			</ButtonPrimaryCta>
			<div class="flex flex-row w-full justify-end px-2 text-water2-dark font-semibold font-sans ">
				<button on:click|preventDefault={(e) => console.log('lieber nicht')}> Lieber nicht </button>
			</div>
		{:else}
			Du hast alles in '{challenge.title}' erledigt.
		{/if}
	</div>
</VSection>
