<script lang="ts">
	import HeaderBar from '$lib/components/header-bar.svelte';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { fly, slide } from 'svelte/transition';

	let insets: Writable<any> = getContext('insets');
	import { headerState } from '$lib/stores/header-store';

	let y = 0;
	let headerTransparent;

	const HEADER_TRANSPARENT_OFFSET = 40;

	const updateHeader = (offset) => {
		const transparent = offset < HEADER_TRANSPARENT_OFFSET;
		console.log(transparent, offset);
		headerState.update((outgoing) => ({ ...outgoing, transparent }));
		return headerTransparent;
	};

	$: headerTransparent = updateHeader(y);
</script>

<div
	transition:fly={{ x: 200, duration: 1000 }}
	class="relative bg-sector-food bg-sector z-20"
	style="margin-top: {$insets.top}px"
>
	<div class="absolute top-0 left-0 right-0 z-30">
		<HeaderBar />
	</div>
	<div
		class="py-4 overflow-x-hidden  h-screen pb-60 relative top-0 left-0 right-0    z-20 max-w-4xl mx-auto"
		on:scroll={(e) => updateHeader(e.currentTarget.scrollTop)}
	>
		<slot />
	</div>
</div>

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
