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
	import type { ChallengeV2, CompletedStep, Difficulty } from '$lib/types/challenges';

	import { headerState } from '$lib/stores/header-store';
	import Fa from 'svelte-fa';
	import { faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';
	import Confetti from '$lib/components/particles/confetti.svelte';
	import {
		completeStep,
		currentLevelForChallenge,
		stepCompleted,
		type ChallengeAccept,
		type ChallengeInteraction,
		type DifficultyName
	} from '$lib/services/challenge-storage';
	import { detectLinks } from '$lib/util';

	export let challenge: ChallengeV2;
	export let challengeState: ChallengeAccept;
	let difficulty: DifficultyName;
	difficulty = difficulty ?? challengeState.lastDifficulty;
	let _difficulty: Difficulty =
		challenge.difficulties[currentLevelForChallenge(challenge, challengeState)];

	let playAt = () => console.warn('playAt undefined');
</script>

<div>
	<div class="text-center mx-auto font-serif font-semibold text-2xl">Todos</div>
	<div class="grid grid-flow-row text-md items-center  gap-2">
		<!-- <Confetti b	ind:playAt /> -->

		{#if _difficulty && _difficulty.todos}
			{#each _difficulty.todos as step}
				<div
					on:click={async (e) => {
						let completed = await completeStep(challengeState, step);
						challengeState = completed;
						if (challengeState.currentSteps.find((step) => step.name === step.name)) {
							playAt(e);
						}
					}}
					class="flex items-center place-content-between select-none cursor-pointer py-4 bg-white px-2 rounded-lg"
				>
					<p class="align-middle prose p">
						{@html detectLinks(step.name)}
					</p>
					<button>
						<Fa
							icon={faCircleCheck}
							class={stepCompleted(challengeState, step) ? 'text-nature' : 'text-storm-light'}
						/>
					</button>
				</div>
			{/each}
		{:else}
			<pre>
				{JSON.stringify(_difficulty, null, 2)}
			</pre>
		{/if}
	</div>
</div>
