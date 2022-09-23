<script lang="ts">
	import type { ChallengeV2 } from '$lib/types/challenges';
	import ChallengeCard from './challenge-card.svelte';

	export let title = '';
	export let challenges: ChallengeV2[] = [];
	export let challengeHidden: (ChallengeV2) => boolean;
	export let tags = {};
	export let pad = false;
</script>

<div class="">
	<!-- get the nice, readable topic title-->
	<div class="text-lg font-light font-serif {pad ? 'px-4' : ''}">{title}</div>
	<div
		class="py-2 grid grid-flow-col gap-4 overflow-x-scroll {pad
			? 'px-4'
			: ''} h-scroller snaps-inline"
		style="
            grid-auto-columns: 6rem;
            grid-template-rows: 4rem;
        "
	>
		{#if challenges && challenges.length > 0}
			{#each challenges as challenge}
				<ChallengeCard {challenge} isHidden={challengeHidden} {tags} />
			{/each}
		{/if}
	</div>
</div>
