<script lang="ts">
	import { fly } from 'svelte/transition';
	export let url: URL;

	let direction = -1;
	let baseOffset = 200;
	let offset = 200;
	let lastUrlLenght = 0;
	let lastUrl;

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

	$: {
		let currentUrlLength = url.pathname.split('/').length;
		console.log(url.pathname, currentUrlLength, url.pathname.split('/'));

		if (currentUrlLength !== lastUrlLenght) {
			console.log(url, currentUrlLength, lastUrlLenght);
			direction = currentUrlLength > lastUrlLenght ? 1 : -1;
		} else {
			direction =
				navigationIndices[url.pathname.split('/')[1]] >
				navigationIndices[lastUrl.pathname.split('/')[1]]
					? 1
					: -1;
		}
		offset = direction * baseOffset;
		lastUrlLenght = currentUrlLength;
		lastUrl = url;
	}
	const pageTransitionDuration = 500;
</script>

{#key url}
	<div
		in:fly={{ x: offset, duration: pageTransitionDuration, delay: pageTransitionDuration }}
		out:fly={{ x: -offset, duration: pageTransitionDuration }}
	>
		<slot />
	</div>
{/key}
