<script lang="ts">
	import ProportionalHeader from '$lib/components/proportional-header.svelte';
	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';

	let contentScroll;
</script>

<MainScreenLayoutBase>
	<ProportionalHeader slot="header" bind:scrollPosition={contentScroll} />

	<MainContentContainer bind:y={contentScroll}>
		<!-- <div
			class="topbar pt-4 px-4 flex flex-col justify-between sticky top-0 z-30 bg-slate-100 shadow-lg "
		/> -->

		<slot />
	</MainContentContainer>
</MainScreenLayoutBase>
