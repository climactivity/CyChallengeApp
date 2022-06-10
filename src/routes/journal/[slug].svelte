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

	import type { AcceptedChallenge } from '$lib/types/challenges';

	export let data: AcceptedChallenge;
	import { headerState } from '$lib/stores/header-store';
	import Fa from 'svelte-fa';
	import { faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';

	headerState.set({
		backbutton: true,
		title: data.title,
		hidden: false,
		transparent: true
	});
</script>

<div in:fly={{ x: 200, duration: 500 }} class="pt-9 ">
	<div class="h-9">
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
		{#each data.completedSteps as completedStep}
			<p class="align-middle">
				{completedStep.completedAt.toLocaleDateString()} - {completedStep.name}
			</p>
			<Fa icon={faCircleCheck} class="text-nature " />
		{/each}

		{#each data.steps as step}
			<p class="align-middle">
				{step.name}
			</p>
			<Fa icon={faCircleCheck} class="text-storm-light " />
		{/each}
	</div>
	{#if browser}
		<div class="bottom-0 right-12 transition-all animate-fade animation-delay-500 opacity-0">
			<ShareButton
				shareOptions={{
					title: data.title,
					text: 'Really awesome thing you need to see right meow',
					url: window.location.href,
					dialogTitle: 'Teile deine Challenge'
				}}
			/>
		</div>
	{/if}
</div>
