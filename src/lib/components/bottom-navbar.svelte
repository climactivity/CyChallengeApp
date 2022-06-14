<script lang="ts">
	import StatsButton from './stats-button.svelte';
	import MenuButton from './menu-button.svelte';
	import HomeButton from './home-button.svelte';
	import FriendsButton from './friends-button.svelte';
	import JournalButton from './journal-button.svelte';
	import { browser } from '$app/env';
	import { page } from '$app/stores';

	if (browser) {
		page.subscribe(({ routeId }) => {
			console.log(routeId);
			// if (path === '/') {
			// 	selected = routeId === '';
			// } else {
			// 	selected = !!routeId?.startsWith(path.slice(1)); // routeId doesn't start with a leading '/'
			// }
		});
	}

	let xSize;
</script>

<div
	bind:clientWidth={xSize}
	style="--x-size: {xSize}px;"
	class="relative
		grid grid-flow-col
		px-2 gap-2 sm:gap-12
		place-content-around sm:place-content-center
		select-none h-12 bg-white  backdrop-blur-md z-50 menu"
	class:home={!!$page.routeId?.startsWith('sector')}
	class:journal={!!$page.routeId?.startsWith('journal')}
	class:stats={!!$page.routeId?.startsWith('stats')}
	class:social={!!$page.routeId?.startsWith('social')}
>
	<HomeButton path="/sector" aria-label="Wald" />
	<JournalButton path="/journal" aria-label="Journal" />
	<StatsButton path="/stats" aria-label="Stats" />
	<FriendsButton path="/social" aria-label="Social" />
	<MenuButton aria-label="Menu" />
</div>

<style lang="scss">
	// .menu::after {
	// 	--marker-width: 2rem;
	// 	content: '';
	// 	position: absolute;
	// 	margin: 0 calc(1.5rem);
	// 	top: 0.15rem;
	// 	height: 0.25rem;
	// 	border-radius: 1rem;
	// 	background: #466f82;
	// 	transition: all 200ms;
	// 	width: var(--marker-width);
	// 	transition-timing-function: cubic-bezier(0.065, 1.65, 0.74, 0.845);
	// }

	// .menu.home::after {
	// 	left: calc(0%);
	// }

	// .menu.journal::after {
	// 	left: calc(20%);
	// }

	// .menu.stats::after {
	// 	left: calc(40%);
	// }

	// .menu.social::after {
	// 	left: calc(60%);
	// }

	@media (min-width: 640px) {
		.menu.home::after {
			left: calc(0% + 2.5rem + 4px);
		}

		.menu.journal::after {
			left: calc(20% + 2.5rem);
		}

		.menu.stats::after {
			left: calc(40% + 2.5rem);
		}

		.menu.social::after {
			left: calc(60% + 2.5rem);
		}
	}
</style>
