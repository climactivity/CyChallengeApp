<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type {
		ChallengeAccept,
		ChallengeComplete,
		ChallengeInteraction
	} from '$lib/services/challenge-storage';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import ButtonPrimaryCta from '../buttons/button-primary-cta.svelte';
	import RewardDisplay from './reward-display.svelte';
	export let challenge: ChallengeV2;
	export let challengeState: ChallengeComplete | ChallengeAccept;

	let lastCompletion;
	$: {
		lastCompletion =
			challengeState && challengeState.completions
				? challengeState.completions[challengeState.completions.length - 1]
				: undefined;
		console.log(challengeState, lastCompletion);
	}
</script>

<VSection {...$$props}>
	<div class="flex flex-col gap-4">
		<div class="text-storm-dark text-xl font-semibold ">Vom "{challenge.title}" hast du dir:</div>
		<RewardDisplay points={challenge.score ?? 10} medals={1} />

		<div class="prose text-lg text-storm-dark">
			<!-- TODO add support for texts based on the difficulty of the selected challenge and if there is another difficulty level -->
			{#if false}
				{challenge.impact}
			{:else}
				Super, diese Challenge gibt es auch noch in wirksamer
			{/if}
		</div>
		<ButtonPrimaryCta
			onClick={(e) => {
				console.log('increase level');
			}}
		>
			Einsatz erhöhen
		</ButtonPrimaryCta>

		<div class="flex flex-row w-full justify-end px-2 text-water2-dark font-semibold font-sans ">
			<button on:click|preventDefault={(e) => console.log('lieber nicht')}> Lieber nicht </button>
		</div>
	</div>
</VSection>
