<script lang="ts">
	import StatsButton from './buttons/stats-button.svelte';
	import MenuButton from './buttons/menu-button.svelte';
	import HomeButton from './buttons/home-button.svelte';
	import FriendsButton from './buttons/friends-button.svelte';
	import JournalButton from './buttons/journal-button.svelte';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import ChallengesButton from './buttons/challenges-button.svelte';
	import FeedButton from './buttons/feed-button.svelte';
	import { showMenu } from '$lib/stores/menu-store';

	let xSize;
	let shadow = true;
	showMenu.subscribe((state) => {
		shadow = !state;
	});
</script>

<div
	bind:clientWidth={xSize}
	style="--x-size: {xSize}px; --show-shadow: {shadow ? 0.05 : 0};"
	class="relative
		grid grid-flow-col
		px-2 gap-2 sm:gap-12
		place-content-around sm:place-content-center
		select-none h-12 bg-white  backdrop-blur-md z-50 menu transition-shadow"
	class:home={!!$page.routeId?.startsWith('challenge')}
	class:journal={!!$page.routeId?.startsWith('journal')}
	class:stats={!!$page.routeId?.startsWith('stats')}
	class:social={!!$page.routeId?.startsWith('social')}
>
	<HomeButton path="/home" aria-label="Wald" />
	<JournalButton path="/journal" aria-label="Journal" />
	<ChallengesButton path="/challenges" aria-label="Challenges" />
	<!-- <FriendsButton path="/social" aria-label="Social" /> -->
	<FeedButton path="/feed" aria-label="Feed" />

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

	.menu {
		box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, var(--show-shadow, 0.05));
	}

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
