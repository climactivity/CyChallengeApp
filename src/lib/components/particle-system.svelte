<script lang="ts">
	import { onMount } from 'svelte';

	export let count = 10;
	export let duration = 1000;
	export let oneshot = false;
	export let colorStart = '#00ffff';
	export let colorEnd = '#ff00ff';

	let spawner: HTMLDivElement;

	const randomPointInRect = (x, y, w, h, minDist, maxDist) => {
		const dist = (Math.random() * (maxDist - minDist) + minDist) | 0;
		x += dist;
		y += dist;
		w -= dist * 2;
		h -= dist * 2;
		if (Math.random() < w / (w + h)) {
			// top bottom
			x = Math.random() * w + x;
			y = Math.random() < 0.5 ? y : y + h - 1;
		} else {
			y = Math.random() * h + y;
			x = Math.random() < 0.5 ? x : x + w - 1;
		}
		return [x | 0, y | 0];
	};

	const trigger = () => {
		console.log('party 🎉');

		const volume = spawner.getBoundingClientRect();
		let origins = Array(count)
			.fill()
			.map(() => {
				return randomPointInRect(volume.x, volume.y, volume.width, volume.height, 0, 10);
			});

		console.log(origins);
	};

	onMount(() => {});
</script>

<div class="relative" on:click={() => trigger()}>
	<slot />
	<div bind:this={spawner} class="absolute inset-0 min-h-full w-full pointer-events-none spawner" />
</div>

<style lang="scss">
	.spawner {
	}

	.particle {
	}
</style>
