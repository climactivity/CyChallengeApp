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
	import {
		isAccepted,
		type AcceptedChallenge,
		type Challenge,
		type CompletedStep
	} from '$lib/types/challenges';

	export let challenge: Challenge | AcceptedChallenge;
	import { headerState } from '$lib/stores/header-store';
	import Fa from 'svelte-fa';
	import { faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import ButtonSecondaryCta from '$lib/components/buttons/button-secondary-cta.svelte';
	import { challenges } from '$testData/challenges';

	let completed;

	headerState.set({
		backbutton: true,
		title: challenge.title,
		hidden: false,
		transparent: true
	});

	const stepCompleted = (step) => {
		if (isAccepted(challenge))
			return !!challenge.completedSteps.find((cs) => cs.name === step.name);
	};
	const completeStep = (step) => {
		if (!isAccepted(challenge)) return;
		if (stepCompleted(step)) {
			challenge.completedSteps = challenge.completedSteps.filter((cs) => cs.name !== step.name);
		} else {
			const completed: CompletedStep = {
				...step,
				completed: true,
				completedAt: new Date()
			};
			challenge.completedSteps = [...challenge.completedSteps, completed];
		}
	};

	const allStepsCompleted = () =>
		isAccepted(challenge) && challenge.completedSteps.length === challenge.steps.length;
	$: completed = allStepsCompleted();
</script>

<div class="text-center mx-auto font-serif font-semibold text-2xl">Todos</div>
<div class="grid grid-flow-row text-xl items-center p-4 m-4">
	{#each challenge.steps as step}
		<div
			on:click={() => completeStep(step)}
			class="flex items-center place-content-between select-none cursor-pointer py-4"
		>
			<p class="align-middle">
				{step.name}
			</p>
			<button>
				<Fa icon={faCircleCheck} class={stepCompleted(step) ? 'text-nature' : 'text-storm-light'} />
			</button>
		</div>
	{/each}
</div>
