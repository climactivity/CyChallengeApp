<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import ProportionalHeader from '$lib/components/proportional-header.svelte';
	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';
	import { headerState } from '$lib/stores/header-store';
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

		if (routesPrev[currentRoute]) {
			goto(routesPrev[currentRoute]);
		}
	};

	const next = () => {
		const currentRoute = $page.routeId;

		if (routesNext[currentRoute]) {
			goto(routesNext[currentRoute]);
		}
	};
</script>

<MainScreenLayoutBase>
	<ProportionalHeader scrollPosition={scrollPos} title="Klimaschutz Übersicht" />
	<MainContentContainer bind:y={scrollPos}>
		<div class="relative">
			<slot />
			<div
				class="absolute top-[70vh]  mx-auto w-full grid grid-flow-col place-items-center bg-red-300"
			>
				<button disabled={!routesPrev[$page.routeId]} on:click={(e) => prev()}> &lt; </button>
				<div class="full grid grid-flow-col place-items-center">
					<a href="/challenges/intro/">Step 1</a>
					<a href="/challenges/intro/step-2">Step 2</a>
					<a href="/challenges/intro/step-3">Step 3</a>
				</div>

				<button disabled={!routesNext[$page.routeId]} on:click={(e) => next()}> &gt; </button>
			</div>
		</div>
	</MainContentContainer>
</MainScreenLayoutBase>
