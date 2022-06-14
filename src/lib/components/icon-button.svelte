<script lang="ts">
	import { browser } from '$app/env';

	import { page } from '$app/stores';

	export let path: string;
	export let label = 'IconButton';
	export let showLabel = false;
	let selected = false;

	if (browser) {
		page.subscribe(({ routeId }) => {
			if (path === '/') {
				selected = routeId === '';
			} else {
				selected = !!routeId?.startsWith(path.slice(1)); // routeId doesn't start with a leading '/'
			}
		});
	}
</script>

<div
	class="cursor-pointer  transition-all duration-500 {selected
		? 'selected'
		: 'unselected'} grid place-content-center grid-flow-col gap-2 menu-button"
>
	<a href={path} aria-label={label}>
		<slot />
		{#if showLabel}
			<div>
				<span>
					{label}
				</span>
			</div>
		{/if}
	</a>
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
