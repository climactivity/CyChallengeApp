<script lang="ts">
	import { headerState } from '$lib/stores/header-store';
	import { getContext, hasContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let title = 'HEADER TEXT MISSING!';
	export let backbutton = false;
	export let scrollPosition = 0;
	export let shadowOffsetStart = 20;
	export let shadowOffsetEnd = 20;
	export let hidden = false;
	export let transparent = false;

	export let onGoBack = () => {
		history.back();
	};

	const back = (e: Event) => {
		onGoBack();
	};

	headerState.subscribe((newState) => {
		title = newState.title;
		backbutton = newState.backbutton;
		onGoBack =
			newState.back ??
			function () {
				history.back();
			};
		hidden = newState.hidden;
		transparent = newState.transparent;
		shadowOffsetEnd = newState.shadowOffsetEnd ?? 20;

		console.log(newState);
	});

	let headerShadow = 0;

	$: headerShadow =
		Math.min(Math.max(0, scrollPosition - shadowOffsetStart), shadowOffsetEnd) / shadowOffsetEnd;
</script>

<div
	class="p-4 flex flex-row justify-between sticky top-0 z-30 bg-slate-100 "
	class:hidden
	style="
					box-shadow: 0 4px 6px -1px rgb(0 0 0 / {0.1 *
		headerShadow *
		(transparent ? 0.0 : 1)}), 0 2px 4px -2px rgb(0 0 0 / {0.1 * headerShadow});
					--tw-bg-opacity: {transparent ? 0.0 : headerShadow}
				"
>
	<div class="flex flex-row gap-2">
		{#if backbutton}
			<button on:click={back} aria-label="back">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
		{/if}
		<div class="font-semibold text-xl font-serif transition-all">{title}</div>
	</div>
	<div>
		<slot name="action" />
	</div>
</div>
