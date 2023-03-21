<script lang="ts">
	import { nkReady } from '$lib/client';
	import { superChallenges } from './super-challenge';
	import SuperChallengeMedalsSkeleton from './super-challenge-medals-skeleton.svelte';
	import SuperChallengeState from './super-challenge-state.svelte';
</script>

<div class="flex flex-col gap-5 items-center place-items-center  w-full">
	<div class="font-serif font-bold text-lg">Super Challenge Abzeichen</div>

	<div class="grid grid-flow-row items-start w-full relative min-h-[24rem]">
		<!-- <SuperChallengeMedalsSkeleton /> -->
		{#if $nkReady}
			{#await superChallenges then scs}
				{#each scs as superChallenge, i}
					{#if superChallenge.frontPage}
						<SuperChallengeState {superChallenge} index={i} />
					{/if}
				{/each}
			{/await}
		{:else}
			<div class="absolute">
				<SuperChallengeMedalsSkeleton />
			</div>
		{/if}
	</div>
</div>
