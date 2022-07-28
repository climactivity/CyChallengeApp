<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { customFlyIn, customFlyOut } from '$lib/better-animation';
	import { fly } from 'svelte/transition';
	export let url: string;
	import { crossfade, scale, slide } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: 200,
		delay: 200,
		fallback: slide
	});
	let direction = -1;
	let baseOffset = 200;
	let offset = 200;
	let lastUrlLenght = 0;
	let lastUrl;
	const pageTransitionDuration = 500;

	let navigationIndices = {
		home: 100,
		challenges: 200,
		challenge: 250,
		journal: 300,
		stats: 400,
		social: 500,
		info: 600,
		welcome: 700
	};

	let insets: Writable<any> = getContext('insets');

	onMount(() => {
		console.log(url);
	});
	$: {
		if (!url === null || !url === undefined) {
			let currentUrlLength = url.split('/').length;

			if (currentUrlLength !== lastUrlLenght) {
				console.log(url, currentUrlLength, lastUrlLenght);
				direction = currentUrlLength > lastUrlLenght ? 1 : -1;
			} else {
				direction =
					navigationIndices[url.split('/')[0]] > navigationIndices[lastUrl.split('/')[0]] ? 1 : -1;
			}
			offset = direction * baseOffset;
			lastUrlLenght = currentUrlLength;
			lastUrl = url;
			console.log(url, currentUrlLength, url.split('/'));
		}
	}
</script>

{#key url}
	<div class="flex flex-row">
		<slot />
	</div>
{/key}
