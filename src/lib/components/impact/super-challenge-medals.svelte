<script lang="ts">
	import { goto } from '$app/navigation';
	import { nkReady } from '$lib/client';
	import type { SuperChallenge } from '$lib/types/challenges';
	import { fade } from 'svelte/transition';
	import SuperChallengeMedalsSkeleton from './super-challenge-medals-skeleton.svelte';
	import SuperChallengeState from './super-challenge-state.svelte';

	let superChallenges: SuperChallenge[] = [
		{ label: 'Ernährung', icon: '/icons/super-challenge-ernährung.svg', slug: 'iss_mehr_pflanzen' },
		{ label: 'Strom', icon: '/icons/super-challenge-strom.svg', slug: 'wechsel_zu_oekostrom' },
		{ label: 'Wärme', icon: '/icons/super-challenge-wärme.svg', slug: 'bleib_cool' },
		{
			label: 'Bewusster Konsume',
			icon: '/icons/super-challenge-konsum.svg',
			slug: 'wuensch_dir_was'
		},
		{
			label: 'Mobilität Land',
			icon: '/icons/super-challenge-mobilität.svg',
			slug: 'weniger_allein__mehr_klimaschutz'
		},
		{ label: 'Geld', icon: '/icons/super-challenge-geld.svg', slug: 'bankwechsel' },
		{
			label: 'Reisen & Fliegen',
			icon: '/icons/super-challenge-travel.svg',
			slug: 'bleib_mal_am_boden'
		}
	];
</script>

<div class="flex flex-col gap-5 items-center place-items-center  w-full">
	<div class="font-serif font-bold text-lg">Super Challenge Abzeichen</div>

	<div class="grid grid-flow-row items-start w-full relative min-h-[24rem]">
		<!-- <SuperChallengeMedalsSkeleton /> -->
		{#if $nkReady}
			{#each superChallenges as superChallenge, i}
				<SuperChallengeState {superChallenge} index={i} />
			{/each}
		{:else}
			<div class="absolute">
				<SuperChallengeMedalsSkeleton />
			</div>
		{/if}
	</div>
</div>
