<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/env';
	import Lottie from 'lottie-web';
	import { ANIMATION_BASE_SPEED } from './page-transition-anim';
	import { AnimationOptions } from 'tsparticles-engine';
	import { page } from '$app/stores';

	export let assetPath;
	export let initDelay = ANIMATION_BASE_SPEED + 100;
	export let animOptions: {
		loop?: boolean | number;
		autoplay?: boolean;
		pauseAfter?: number;
		[key: string]: any;
	} = {
		loop: true,
		autoplay: true,
		pauseAfter: 0
	};

	const urlToAbsolute = (relativePath) => {
		const location = window.location;
		// console.log(location);
		return location.origin + '/' + relativePath;
	};

	let anim, animContainer;
	let guard = false;
	onMount(() => {
		setTimeout(async () => {
			if (browser) {
				console.log('init anim', anim, guard);
				if (anim) {
					return;
				}
				if (guard) {
					return;
				}
				guard = true;
				anim = Lottie.loadAnimation({
					container: animContainer,
					renderer: 'svg',

					...animOptions,
					path: urlToAbsolute(assetPath)
				});

				if (animOptions.pauseAfter > 0) {
					setTimeout(() => {
						anim.pause();
					}, animOptions.pauseAfter);
				}
			}
		}, ANIMATION_BASE_SPEED + 100);
	});

	onDestroy(() => {
		if (anim) {
			Lottie.destroy(anim);
		}
	});

	export let play = () => {
		if (anim) {
			anim.play();
		}
	};
</script>

<div id="anim" bind:this={animContainer} />
