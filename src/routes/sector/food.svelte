<script lang="ts">
	import { goto } from '$app/navigation';

	import { headerState } from '$lib/stores/header-store';
	import { onMount } from 'svelte';
	import { element } from 'svelte/internal';

	headerState.set({
		backbutton: true,
		title: 'Ernährung Zelt',
		hidden: false
	});

	let mapElement: HTMLDivElement;
	let lastElement: HTMLDivElement;
	let y;
	onMount(() => {
		if (!mapElement) return;

		console.log(mapElement, lastElement, lastElement.offsetTop);
		mapElement.scrollTop = lastElement.offsetTop;

		//scrollTo({ top: mapElement.scrollHeight });
	});

	$: console.log(y);
</script>

<div bind:this={mapElement} class="overflow-scroll h-screen">
	<div class="relative w-full forest-floor h-[3300px] overflow-y-scroll">
		<!-- <img src="/path1.svg" alt="path" /> -->
		<div class="relative w-0 top-0 left-1/2 min-h-full">
			<div class="challenge-node" style="top: 82%;  left: -150px;">
				Spiele das Quiz ‘Methan und Lachgas-emission’
			</div>
			<div class="challenge-node" style="top: 65%;">Mach zwei veganen Tage</div>
			<div class="challenge-node" style="top: 85.0%; left: 0px;">
				Spiele das Quiz Pflanzliche Ernährung
			</div>
			<div class="challenge-node" style="top: 91.3%; left: -100px;">
				Infobyte ‘Tierische Produkte’
			</div>

			<div
				bind:this={lastElement}
				on:click={() => goto('/challenge/v-day')}
				class="challenge-node"
				style="top: 91.3%; left: 20px;"
			>
				Mach einen veganen Tag
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.forest-floor::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		margin: 0 auto;
		left: 0;
		right: 0;
		width: 375px;
		height: 3300px;
		background-image: url(/path1.svg);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: 50% 500px;
	}
	.forest-floor {
		background-image: url(/floortex_TILED.png);
		background-size: 50%;
		// overflow-y: auto;
		// overscroll-behavior-y: contain;
		// scroll-snap-type: y proximity;
	}

	.forest-floor > div > div:last-child {
		scroll-snap-align: end;
	}

	.challenge-node {
		transform: translateX(-50%);
		@apply absolute bg-white px-2 py-2 w-28 rounded shadow text-center;
	}
</style>
