<script lang="ts">
	import { browser } from '$app/env';

	import { page } from '$app/stores';

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
					selected = !!routeId?.startsWith(path.slice(1)); // routeId doesn't start with a leading '/'
				}
			});
		}
	}
</script>

<div
	class="focus:outline-none cursor-pointer  transition-all duration-500 {selected
		? 'selected'
		: 'unselected'} grid place-content-center grid-flow-col gap-2 menu-button"
>
	{#if path !== '#'}
		<a href={path} aria-label={label} class="grid place-items-center">
			<slot />
			{#if showLabel}
				<div class="text-xs text-storm-dark">
					<span>
						{label}
					</span>
				</div>
			{/if}
		</a>
	{:else}
		<button aria-label={label} class="grid place-items-center" on:click={(e) => onClick(e)}>
			<slot />
			{#if showLabel}
				<div class="text-md text-storm-darkest">
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
		fill: #5689a0;
		color: #5689a0;
		// animation: select 150ms ease forwards;
	}

	.unselected {
		fill: #000000;
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
