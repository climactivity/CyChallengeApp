<script lang="ts">
	import { customFade } from '$lib/animations/better-animation';
	import { fade } from 'svelte/transition';
	import ChallengeCardSkeleton from './challenge-card-skeleton.svelte';

	export let title = '';
	export let length = 3;

	export let sizeW = '12rem';
	export let sizeH = '8rem';
	let challenges = Array(length);
</script>

<div class="">
	<!-- get the nice, readable topic title-->
	{#if title != ''}
		<div class="text-lg font-light font-serif px-4">{title}</div>
	{:else}
		<div class="text-lg font-light font-serif px-4">&nbsp;</div>
	{/if}
	<div
		class="py-2 grid grid-flow-col gap-4 overflow-x-scroll place-items-stretch 
			px-4 h-scroller snaps-inline"
		style="
            grid-auto-columns: {sizeW};
            grid-auto-rows: {sizeH};
        "
	>
		{#each challenges as _}
			<ChallengeCardSkeleton />
		{/each}
	</div>
</div>
