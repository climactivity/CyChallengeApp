<script lang="ts">
	let insets: Writable<any> = getContext('insets');

	import { page } from '$app/stores';
import TopHeader from '$lib/components/top-header.svelte';
	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let shadowOffsetStart = 0,
		shadowOffsetEnd = 20;
	let scrollPosition;
	let headerShadow = 0;
	console.log('route', $page.routeId);
	$: headerShadow =
		Math.min(Math.max(0, scrollPosition - shadowOffsetStart), shadowOffsetEnd) / shadowOffsetEnd;
</script>

<MainScreenLayoutBase>
	<div
		class="pt-4 px-4 flex flex-col justify-between sticky top-0 z-30 bg-slate-100 "
		style="
					box-shadow: 0 4px 6px -1px rgb(0 0 0 / {0.1 * headerShadow}), 0 2px 4px -2px rgb(0 0 0 / {0.1 *
			headerShadow});
					--tw-bg-opacity: {headerShadow}
				"
	>
	<TopHeader/>

		<div class="font-semibold text-xl font-serif transition-all">Meine Aktionen</div>

		<!-- Tabs -->
		<div class="py-2">
			<div
				class=" select-none grid grid-flow-col align-bottom place-items-center justify-around md:mx-auto md:max-w-3xl px-4 flex-nowrap overflow-x-auto bg-slate-100 ring-opacity-100 "
				style="grid-template-columns: 1fr 1fr 1fr;"
			>
				<a class="tab" href="/journal" class:activeTab={$page.routeId === 'journal'}>Aktuell</a>
				<a
					class="tab"
					href="/journal/bookmarks"
					class:activeTab={$page.routeId === 'journal/bookmarks'}>Gespeichert</a
				>
				<a
					class="tab"
					href="/journal/achievements"
					class:activeTab={$page.routeId === 'journal/achievements'}>Geschafft</a
				>
			</div>
		</div>
	</div>

	<MainContentContainer bind:y={scrollPosition}>
		<slot />
	</MainContentContainer>
</MainScreenLayoutBase>

<style lang="scss">
	.tab {
		text-decoration-line: underline;
		@apply transition-colors;
	}
	.activeTab {
		text-decoration-line: none;
		@apply font-bold text-water text-lg;
	}
</style>
