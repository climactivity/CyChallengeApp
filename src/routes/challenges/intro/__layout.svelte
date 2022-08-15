<script lang="ts">
	import { browser } from '$app/env';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import ProportionalHeader from '$lib/components/proportional-header.svelte';
	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';
	import { headerState } from '$lib/stores/header-store';
	import { insets } from '$lib/stores/context';
	import { getContext } from 'svelte';

	headerState.set({
		backbutton: true,
		title: 'Klimaschutz Übersicht',
		hidden: false,
		back: () => {
			goto('/challenges');
		}
	});
	let scrollPos = 0;

	let routesNext = {
		'challenges/intro': '/challenges/intro/step-2',
		'challenges/intro/step-2': '/challenges/intro/step-3'
	};

	let routesPrev = {
		'challenges/intro/step-2': '/challenges/intro',
		'challenges/intro/step-3': '/challenges/intro/step-2'
	};

	const prev = () => {
		const currentRoute = $page.routeId;
		console.log('prev', currentRoute, routesPrev[currentRoute]);
		if (routesPrev[currentRoute]) {
			goto(routesPrev[currentRoute]);
		}
	};

	const next = () => {
		const currentRoute = $page.routeId;
		console.log('next', currentRoute, routesPrev[currentRoute]);

		if (routesNext[currentRoute]) {
			goto(routesNext[currentRoute]);
		}
	};
	const iOSSafari = getContext('iOSSafari');

	const getBottomOffset = () => {
		return `iOSSafari ? ${$insets.bottom}px : 'h-[100vh]'`;
	};
</script>

<MainScreenLayoutBase>
	<ProportionalHeader scrollPosition={scrollPos} title="Klimaschutz Übersicht" />

	<div
		class="absolute {iOSSafari
			? 'bottom-[15vh]'
			: 'bottom-0'} bg-white pb-20 pt-2  mx-auto w-full grid grid-flow-col place-items-center z-40 tutorial-nav"
	>
		<button disabled={!routesPrev[$page.routeId]} on:click={(e) => prev()}> Zurück </button>
		<!-- svelte-ignore a11y-missing-content -->
		<div class="full grid grid-flow-col place-items-center gap-2 ">
			<a
				class="tab"
				class:activeTab={$page.routeId === 'challenges/intro'}
				href="/challenges/intro/"
			/>
			<a
				class="tab"
				class:activeTab={$page.routeId === 'challenges/intro/step-2'}
				href="/challenges/intro/step-2"
			/>
			<a
				class="tab"
				class:activeTab={$page.routeId === 'challenges/intro/step-3'}
				href="/challenges/intro/step-3"
			/>
		</div>

		<button disabled={!routesNext[$page.routeId]} on:click={(e) => next()}> Weiter </button>
	</div>
	<MainContentContainer bind:y={scrollPos}>
		<div class="relative min-h-full">
			<slot />
		</div>
	</MainContentContainer>
</MainScreenLayoutBase>

<style>
	button {
		@apply bg-white
		text-water
		px-4 py-2
		rounded-lg
		shadow-md;
	}
	.tab {
		@apply bg-slate-500 px-4 py-2 rounded-full h-4 w-4 transition-all;
	}

	.activeTab {
		@apply bg-slate-300 px-4 py-2 rounded-full;
	}

	.tutorial-nav {
		box-shadow: 0px -5px 5px 0px rgba(0, 0, 0, 0.1);
	}
</style>
