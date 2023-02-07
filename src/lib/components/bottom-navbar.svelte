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
	import ImpactButton from './buttons/impact-button.svelte';

	let xSize;
	let shadow = true;
	showMenu.subscribe((state) => {
		shadow = !state;
	});

	page.subscribe((state) => {
		shadow = !state?.routeId?.startsWith('challenges/intro');
	});
</script>

<div
	bind:clientWidth={xSize}
	style="--x-size: {xSize}px; --show-shadow: {shadow ? 0.05 : 0};
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;"
	class="relative 
		z-50
		h-16
		max-w-xl
		mx-auto	
		grid 
		px-2 
		gap-2 sm:gap-12
		place-content-end sm:place-content-center
		transition-shadow
		bg-white  backdrop-blur-md
		select-none  menu   "
	class:home={!!$page.routeId?.startsWith('impact')}
	class:challegne={!!$page.routeId?.startsWith('challenges') ||
		!!$page.routeId?.startsWith('challenge')}
	class:journal={!!$page.routeId?.startsWith('journal')}
	class:stats={!!$page.routeId?.startsWith('stats')}
	class:social={!!$page.routeId?.startsWith('social')}
	class:feed={!!$page.routeId?.startsWith('feed')}
>
	<!-- <HomeButton path="/home"  /> -->
	<ImpactButton path="/impact" />

	<JournalButton path="/journal" />
	<ChallengesButton path="/challenges" />
	<!-- <FriendsButton path="/social" aria-label="Social" /> -->
	<FeedButton path="/feed" />

	<MenuButton />
</div>

<style lang="scss">
	.menu::after {
		--marker-width: 2rem;
		content: '';
		position: absolute;
		margin: 0 1.6rem; /* FIXME awful magic number */
		top: 0.15rem;
		height: 0.25rem;
		border-radius: 1rem;
		background: #466f82;
		transition: all 200ms;
		width: var(--marker-width);
		transition-timing-function: cubic-bezier(0.065, 1.65, 0.74, 0.845);
	}

	.menu.home::after {
		left: calc(0%);
	}

	.menu.journal::after {
		left: calc(20%);
	}

	.menu.stats::after {
		left: calc(40%);
	}

	.menu.challegne::after {
		left: calc(40%);
	}
	.menu.social::after {
		left: calc(60%);
	}

	.menu.feed::after {
		left: calc(60%);
	}

	.menu {
		box-shadow: 0px -3px 3px 0px rgba(0, 0, 0, var(--show-shadow, 0.05));
	}

	@media (min-width: 640px) {
		.menu.home::after {
			left: calc(0%);
		}

		.menu.journal::after {
			left: calc(21.5%);
		}

		.menu.challegne::after {
			left: calc(42.5%);
		}

		.menu.feed::after {
			left: calc(64%);
		}
	}
</style>
