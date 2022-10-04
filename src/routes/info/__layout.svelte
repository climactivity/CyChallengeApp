<script lang="ts">
	import ProportionalHeader from '$lib/components/proportional-header.svelte';
	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';

	let contentScroll;
	// $: console.log(contentScroll);
</script>

<MainScreenLayoutBase>
	<ProportionalHeader slot="header" scrollPosition={contentScroll} />
	<MainContentContainer bind:y={contentScroll}>
		<!-- <div class="mx-2 px-2 rounded bg-white"> -->
		<slot />
		<!-- </div> -->
	</MainContentContainer>
</MainScreenLayoutBase>
