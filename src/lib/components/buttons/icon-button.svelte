<script lang="ts">
	import { browser } from '$app/env';
	import { goto, prefetch } from '$app/navigation';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let path: string = '#';
	export let onClick: Function = (e: Event) => {};
	export let label = 'IconButton';
	export let showLabel = false;
	let selected = false;

	if (browser) {
		if (path !== '#') {
			page.subscribe(({ routeId }) => {
				if (path === '/') {
					selected = routeId === '';
				} else {
					// ugly hack to have challenges button selected even if we're on the challenge page
					if (path.slice(1) === 'challenges') {
						selected = !!routeId.match(/^challenge.*$/);
					} else {
						selected = !!routeId?.startsWith(path.slice(1)); // routeId doesn't start with a leading '/'
					}
				}
			});
		}
	}

	const navigateJankfree = async () => {
		// await prefetch(path);
		goto(path);
	};

	// onMount(() => {
	// 	if (path) {
	// 		prefetch(path);
	// 	}
	// });
</script>

<div
	lang="de"
	class="focus:outline-none cursor-pointer  transition-all duration-150 {selected
		? 'selected'
		: 'unselected'} grid place-content-center grid-flow-col gap-2 menu-button break-words"
	style="hyphens: auto;"
>
	{#if path !== '#'}
		<div href={path} aria-label={label} class="grid place-items-center" on:click={navigateJankfree}>
			<div class="h-7 grid place-content-center">
				<slot />
			</div>
			{#if showLabel}
				<div class="text-xs mb-1 ">
					<span>
						{label}
					</span>
				</div>
			{/if}
		</div>
	{:else}
		<button aria-label={label} class="grid place-items-center" on:click={(e) => onClick(e)}>
			<slot />
			{#if showLabel}
				<div class="text-sm text-storm-darkest">
					<span>
						{label}
					</span>
				</div>
			{/if}
		</button>
	{/if}
</div>

<style lang="scss">
	.selected {
		position: relative;
		fill: #5689a0;
		color: #5689a0;
		// animation: select 150ms ease forwards;
		--fill: #5689a0;
	}

	.unselected {
		fill: #000000;
		// --fill: #000000;
	}

	.menu-button {
		height: 100%;
	}

	@keyframes select {
		0% {
			transform: scale3d(1, 1, 1) translateY(0px);
		}

		33% {
			transform: scale3d(1.1, 1.1, 1.1) translateY(-2px);
		}

		100% {
			transform: scale3d(1, 1, 1) translateY(0px);
		}
	}
</style>
