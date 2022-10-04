<script lang="ts">
	import { goto } from '$app/navigation';
	import { nkReady } from '$lib/client';
	import type { SuperChallenge } from '$lib/types/challenges';
	import SuperChallengeMedalsSkeleton from './super-challenge-medals-skeleton.svelte';
	import SuperChallengeState from './super-challenge-state.svelte';

	let superChallenges: SuperChallenge[] = [
		{ label: 'Ernährung', icon: '/icons/super-challenge-ernährung.svg', slug: 'iss_mehr_pflanzen' },
		{ label: 'Strom', icon: '/icons/super-challenge-strom.svg', slug: 'iss_mehr_pflanzen' },
		{ label: 'Wärme', icon: '/icons/super-challenge-wärme.svg', slug: 'iss_mehr_pflanzen' },
		{
			label: 'Bewusster Konsume',
			icon: '/icons/super-challenge-konsum.svg',
			slug: 'iss_mehr_pflanzen'
		},
		{
			label: 'Mobilität Land',
			icon: '/icons/super-challenge-mobilität.svg',
			slug: 'iss_mehr_pflanzen'
		},
		{ label: 'Geld', icon: '/icons/super-challenge-geld.svg', slug: 'iss_mehr_pflanzen' },
		{
			label: 'Reisen & Fliegen',
			icon: '/icons/super-challenge-travel.svg',
			slug: 'iss_mehr_pflanzen'
		}
	];
</script>

<div class="flex flex-col gap-5 items-center place-items-center  w-full">
	<div class="font-serif font-bold text-lg">Super Challenge Abzeichen</div>

	<div class="grid grid-flow-row items-start w-full">
		{#if $nkReady}
			{#each superChallenges as superChallenge}
				<SuperChallengeState {superChallenge} />
			{/each}
		{:else}
			<SuperChallengeMedalsSkeleton />
		{/if}
	</div>
</div>
