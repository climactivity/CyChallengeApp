<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import ProportionalHeader from '$lib/components/proportional-header.svelte';
	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';

	let contentScroll;
</script>

<!-- <div class="relative " style="margin-top: {$insets.top}px" in:fly={{ duration: 1000, x: 200 }}> -->
<MainScreenLayoutBase>
	<ProportionalHeader slot="header" scrollPosition={contentScroll} />
	<MainContentContainer bind:y={contentScroll}>
		<slot />
	</MainContentContainer>
</MainScreenLayoutBase>

<style lang="scss">
	.bg-sector:before {
		content: '';
		position: absolute;
		inset: -50px -50px 0 0;
		z-index: -1;
		background-image: var(--sector-icon, url(/cyIcons.svg));
		background-repeat: no-repeat;
		background-position: top right;
		background-size: 300px 300px;
		background-clip: unset;
		transform: rotateZ(5deg);
		opacity: 0.2;
	}

	.bg-sector {
		background: linear-gradient(180deg, var(--sector-bg-color, #ffffff) 0%, #ffffff 100%);
	}

	.bg-sector-food {
		--sector-icon: url(/icons/cyicon-ernaehrung.svg);
		--sector-bg-color: #fdfff7;
	}

	.bg-sector-energy {
		--sector-icon: url(/icons/cyicon-energie.svg);
		//--sector-bg-color: rgb(167, 0, 0);
		--sector-bg-color: #fff7f7;
	}
</style>
