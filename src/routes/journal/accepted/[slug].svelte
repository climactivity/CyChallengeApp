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
	import { browser } from '$app/env';
	import ShareButton from '$lib/components/share-button.svelte';
	import { fly } from 'svelte/transition';

	import type { AcceptedChallenge, CompletedStep } from '$lib/types/challenges';

	export let data: AcceptedChallenge;
	import { headerState } from '$lib/stores/header-store';
	import Fa from 'svelte-fa';
	import { faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import ButtonSecondaryCta from '$lib/components/buttons/button-secondary-cta.svelte';

	let completed;

	headerState.set({
		backbutton: true,
		title: data.title,
		hidden: false,
		transparent: true
	});

	const stepCompleted = (step) => {
		return !!data.completedSteps.find((cs) => cs.name === step.name);
	};
	const completeStep = (step) => {
		if (stepCompleted(step)) {
			data.completedSteps = data.completedSteps.filter((cs) => cs.name !== step.name);
		} else {
			const completed: CompletedStep = {
				...step,
				completed: true,
				completedAt: new Date()
			};
			data.completedSteps = [...data.completedSteps, completed];
		}
	};

	const allStepsCompleted = () => data.completedSteps.length === data.steps.length;
	$: completed = allStepsCompleted();
</script>

<div in:fly={{ x: 200, duration: 500 }} class="pt-9 ">
	<div class="h-20">
		{#if $headerState.transparent}
			<h1
				in:fly={{ y: -200, duration: 200 }}
				out:fly={{ y: -200, duration: 200 }}
				class="text-center mx-auto text-4xl font-bold font-sans"
			>
				{data.title}
			</h1>
		{/if}
	</div>

	<p class="text-lg p-4 m-4">
		{data.content}
	</p>

	<div class="text-center mx-auto text-2xl">Todos</div>
	<div
		class="grid gap-x-6 gap-y-4 text-xl items-center p-4 m-4"
		style="grid-template-columns: 1fr 2rem;"
	>
		{#each data.steps as step}
			<p class="align-middle">
				{step.name}
			</p>
			<button on:click={() => completeStep(step)}>
				<Fa icon={faCircleCheck} class={stepCompleted(step) ? 'text-nature' : 'text-storm-light'} />
			</button>
		{/each}
	</div>
	{#if allStepsCompleted}
		<div class="p-4 m-4 space-y-4">
			<ButtonPrimaryCta onClick={(e) => console.log(e)}>Challenge abschließen</ButtonPrimaryCta>
			{#if browser}
				<ShareButton
					shareOptions={{
						title: data.title,
						text: 'Really awesome thing you need to see right meow',
						url: window.location.href,
						dialogTitle: 'Teile deine Challenge'
					}}
				/>
			{/if}
		</div>
	{/if}
</div>
