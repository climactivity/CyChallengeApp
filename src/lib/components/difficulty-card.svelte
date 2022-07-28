<script lang="ts">
	import { browser } from '$app/env';
	import ShareButton from '$lib/components/buttons/share-button.svelte';
	import { fly } from 'svelte/transition';

	import type {
		AcceptedChallenge,
		ChallengeV2,
		CompletedStep,
		Difficulty
	} from '$lib/types/challenges';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { detectLinks } from '$lib/util';
	import { onMount } from 'svelte';

	let showMore = false;

	const back = () => {
		if (showMore) {
			showMore = false;
			goto($page.url.pathname);
		} else {
			history.back();
		}
	};

	export let difficulty: Difficulty;
	export let name: string;
	export let selected: boolean;
	export let onSelected: Function;

	let color = '#f5f5f5';
	onMount(async () => {
		switch (name) {
			case 'Einfach':
				color = '#99ff99';
				break;
			case 'Mittelschwer':
				color = '#ffff99';
				break;
			case 'Schwer ':
				color = '#ff9999';
				break;
			case 'Plus':
				color = '#9999ff';
				break;
			default:
				color = '#f5f5f5';
				break;
		}
	});
</script>

<div
	on:click={(e) => {
		onSelected(name);
	}}
	class="base"
	style="--color: {color};"
>
	<p class="text-center font-bold text-xl pb-2">
		{name}
	</p>
	<p class="align-middle text-lg pb-2">
		{difficulty.taskDescription}
	</p>
	<ul class="list-disc px-5">
		{#each difficulty.todos as todo}
			<li class="align-middle text-base prose">
				{@html detectLinks(todo.name)}
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.selected {
		background-color: var(--color, #f5f5f5);
		border: 1px solid var(--color, #f5f5f5) !important;
	}

	.base {
		@apply rounded-xl p-2 bg-white;
		cursor: pointer;
		transition: all 500ms;
		// border: 1px solid #dadada;
	}
</style>
