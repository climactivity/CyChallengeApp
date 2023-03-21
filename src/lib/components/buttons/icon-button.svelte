<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

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
	class=" w-full focus:outline-none cursor-pointer  transition-all duration-150 {selected
		? 'selected'
		: 'unselected'} grid place-content-center grid-flow-col gap-2 menu-button break-words button-wrapper"
	style="hyphens: auto;"
>
	{#if path !== '#'}
		<div aria-label={label} class="grid place-items-center" on:click={navigateJankfree}>
			<div class="h-7 grid place-content-center">
				<slot />
			</div>
			{#if showLabel}
				<div class="text-xs mt-1 mb-1 whitespace-nowrap">
					<span>
						{label}
					</span>
				</div>
			{/if}
		</div>
	{:else}
		<button aria-label={label} class="grid place-items-center gap-2 " on:click={(e) => onClick(e)}>
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
	.button-wrapper {
		position: relative;
		&:after {
			position: absolute;
			content: '';
			transition-property: transform;
			transition-duration: 150ms;
			transition-timing-function: ease-out;

			@apply -top-[20%] left-4 right-4 h-1 bg-heart rounded-full;
		}
	}
	.selected {
		position: relative;
		// fill: #5689a0;
		// color: #5689a0;
		// // animation: select 150ms ease forwards;
		// --fill: #5689a0;

		@apply fill-heart text-heart;

		&::after {
			transform: scaleX(1);
		}
	}

	.unselected {
		fill: #000000;
		// --fill: #000000;
		&::after {
			transform: scaleX(0);
		}
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
