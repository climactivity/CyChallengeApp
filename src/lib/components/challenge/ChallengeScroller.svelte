<script lang="ts">
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { onMount } from 'svelte';
	import ChallengeCard from './challenge-card.svelte';

	export let title = '';
	export let challenges: ChallengeV2[] = [];
	let _challenges = [];
	export let challengeHidden: (ChallengeV2) => boolean;
	export let tags = {};
	export let pad = false;

	export let sizeW = '11rem';
	export let sizeH = '8rem';
	onMount(() => {
		_challenges = [
			...challenges.sort((a, b) => {
				let aValue = a.lead ? -1 : 1;
				let bValue = b.lead ? -1 : 1;
				return aValue - bValue;
			})
		];
	});
</script>

<div class="">
	<!-- get the nice, readable topic title-->
	<div class="text-lg font-light font-serif {pad ? 'px-4' : ''}">{title}</div>
	<div
		class="py-2 grid grid-flow-col gap-4 overflow-x-scroll place-items-stretch {pad
			? 'px-4'
			: ''} h-scroller snaps-inline rou"
		style="
            grid-auto-columns: {sizeW};
            grid-auto-rows: {sizeH};
        "
	>
		{#if _challenges && _challenges.length > 0}
			{#each _challenges as challenge}
				<ChallengeCard {challenge} isHidden={challengeHidden} {tags} />
			{/each}
		{/if}
	</div>
</div>
