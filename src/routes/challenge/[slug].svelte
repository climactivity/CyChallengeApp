<script lang="ts" context="module">
	import { availableChallenges, challenges } from '$testData/challenges';

	export async function load({ params, fetch, session, stuff }) {
		let challenge = availableChallenges.find((challenge) => challenge.slug === params.slug);
		return {
			status: 200,
			props: {
				data: challenge
			}
		};
	}
</script>

<script lang="ts">
	import DifficultyCard from '../../lib/components/difficulty-card.svelte';

	import { browser } from '$app/env';
	import ShareButton from '$lib/components/share-button.svelte';
	import { fly } from 'svelte/transition';

	import type { AcceptedChallenge, ChallengeV2, CompletedStep } from '$lib/types/challenges';

	export let data: ChallengeV2;
	import { headerState } from '$lib/stores/header-store';
	import Fa from 'svelte-fa';
	import { faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import ButtonSecondaryCta from '$lib/components/buttons/button-secondary-cta.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { detectLinks } from '$lib/util';
	import Confetti from '$lib/components/particles/confetti.svelte';

	let showMore = false;

	const back = () => {
		if (showMore) {
			showMore = false;
			goto($page.url.pathname, { replaceState: true });
		} else {
			history.back();
		}
	};
	$: showMore = !!$page.url.hash.endsWith('more');
	headerState.set({
		backbutton: true,
		title: data.title,
		hidden: false,
		transparent: true,
		back
	});

	let selectedDifficulty: string;
	const selectDifficulty = (difficulty: string) => {
		if (selectedDifficulty === difficulty) {
			selectedDifficulty = undefined;
		} else {
			selectedDifficulty = difficulty;
		}
	};

	let addedPlus = false;
	const addPlus = (added: string) => {
		addedPlus = !!!addedPlus;
	};

	let playAt;
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

	<div class="p-4 m-4 space-y-4">
		<Confetti id="challenge_accept_particles" bind:playAt />
		{#if showMore}
			<p class="text-lg  prose">
				{data.content}
			</p>
		{:else}
			<p class="text-lg  prose">
				{data.frontMatter}
			</p>

			<div class="py-4 my-4">
				<ButtonSecondaryCta onClick={() => goto(`#more`)}>Mehr Informationen</ButtonSecondaryCta>
			</div>
			<!-- <div class="text-center mx-auto text-2xl">Todos</div> -->
			<div
				class="grid gap-x-6 gap-y-4 text-xl items-center py-4 my-4"
				style="grid-template-columns: 1fr;"
			>
				{#each Object.keys(data.difficulties).filter((s) => s !== 'Plus') as difficulty}
					<DifficultyCard
						name={difficulty}
						difficulty={data.difficulties[difficulty]}
						onSelected={selectDifficulty}
						selected={selectedDifficulty === difficulty}
					/>
				{/each}

				{#if data.difficulties.Plus}
					<DifficultyCard
						name="Plus"
						difficulty={data.difficulties.Plus}
						onSelected={addPlus}
						selected={addedPlus}
					/>
				{/if}
			</div>
			<div class="py-4 my-4 space-y-4">
				<ButtonPrimaryCta disabled={selectedDifficulty === undefined} onClick={(e) => playAt(e)}
					>Challenge annehmen</ButtonPrimaryCta
				>
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
</div>
