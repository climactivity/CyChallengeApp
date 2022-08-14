<script lang="ts">
	let insets: Writable<any> = getContext('insets');

	import { page } from '$app/stores';
import TopHeader from '$lib/components/top-header.svelte';
	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';


	let scrollPosition;
</script>

<MainScreenLayoutBase>
	<div
		class="topbar pt-4 px-4 flex flex-col justify-between sticky top-0 z-30 bg-slate-100 shadow-lg "
	>
	<TopHeader/>

	</div>

	<MainContentContainer bind:y={scrollPosition}>
		<slot />
	</MainContentContainer>
</MainScreenLayoutBase>

<style lang="scss">
	
</style>
