<script lang="ts">
	import ProportionalHeader from '$lib/components/proportional-header.svelte';
	import MainContentContainer from '$lib/layouts/main-content-container.svelte';

	let contentScroll;
	// $: console.log(contentScroll);
</script>

<div>
	<ProportionalHeader slot="header" scrollPosition={contentScroll} />
	<MainContentContainer bind:y={contentScroll}>
		<div class="mx-2 px-2 rounded bg-white">
			<slot />
		</div>
	</MainContentContainer>
</div>
