<script lang="ts">
	import { page } from '$app/stores';
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';
	import type { ChallengeInteraction } from '$lib/services/challenge-storage';

	import type { ChallengeV2 } from '$lib/types/challenges';
	import { randomIntBetween } from '$lib/util';

	export let index = 0;
	export let challenge: ChallengeV2;
	export let challengeState: ChallengeInteraction;
	let imageUrl = 'https://picsum.photos/id/' + randomIntBetween(1, 1000) + '/200/200';
	$: {
		imageUrl =
			challenge && challenge.image != '' ? challenge.image?.file?.path ?? undefined : undefined;
		// console.log('image', challenge.image?.file?.path, $page.url);
	}

	export let onClick = () => {};
</script>

<div
	class="grid grid-flow-col h-20 animate-fadeInUp opacity-0"
	on:click={onClick}
	style="grid-template-columns: 1fr 2fr; animation-delay: {(index * ANIMATION_BASE_SPEED) / 2 +
		ANIMATION_BASE_SPEED}ms;"
>
	<div
		class="image-element z-10 card-container shadow-storm-light"
		style={imageUrl
			? `--bg-image: url(${$page.url.origin + '/' + imageUrl})`
			: `--bg-image: url("/images/not-found.webp")`}
	/>
	<div class="relative">
		<div class="absolute bottom-1 right-4">
			<button>
				<svg
					width="20"
					height="21"
					viewBox="0 0 20 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M1.24986 10.4998C1.24986 10.6656 1.31571 10.8245 1.43292 10.9418C1.55013 11.059 1.7091 11.1248 1.87486 11.1248L16.6161 11.1248L12.6824 15.0573C12.565 15.1747 12.4991 15.3338 12.4991 15.4998C12.4991 15.6658 12.565 15.825 12.6824 15.9423C12.7997 16.0597 12.9589 16.1256 13.1249 16.1256C13.2908 16.1256 13.45 16.0597 13.5674 15.9423L18.5674 10.9423C18.6256 10.8843 18.6717 10.8153 18.7033 10.7394C18.7348 10.6634 18.751 10.582 18.751 10.4998C18.751 10.4176 18.7348 10.3362 18.7033 10.2603C18.6717 10.1843 18.6256 10.1154 18.5674 10.0573L13.5674 5.05731C13.5092 4.9992 13.4403 4.95311 13.3643 4.92166C13.2884 4.89021 13.207 4.87402 13.1249 4.87402C12.9589 4.87402 12.7997 4.93995 12.6824 5.05731C12.565 5.17467 12.4991 5.33384 12.4991 5.49981C12.4991 5.66578 12.565 5.82495 12.6824 5.94231L16.6161 9.87481L1.87486 9.87481C1.7091 9.87481 1.55013 9.94066 1.43292 10.0579C1.31571 10.1751 1.24986 10.3341 1.24986 10.4998Z"
						fill="black"
						fill-opacity="0.75"
					/>
				</svg>
			</button>
		</div>
		<div class="title-container">
			{challenge.title}
		</div>
	</div>
</div>

<style lang="scss">
	.title-container {
		border-radius: 0rem 0.375rem 0.375rem 0rem;
		box-shadow: 0px 5px 0px 0px #ffffff, 0px 8px 6px 0px rgba(0 0 0 /0.1);
		@apply bg-white h-full  p-1;
	}
	.card-container {
		border-radius: 4px 0px 0px 2rem;
		transition: all 0.2s ease-in-out;

		box-shadow: 0px 5px 0px 0px var(--tw-shadow-color), 0px 8px 6px 0px rgba(0 0 0 /0.1);
		scroll-snap-align: start;
		overflow: hidden;
	}

	.image-element {
		position: relative;
	}
	.image-element::after {
		content: '';
		position: absolute;
		inset: 0rem;
		width: 100%;
		height: 100%;
		z-index: 10;
		background: var(--bg-image, url('/images/not-found.webp'));
		background-blend-mode: multiply;
		background-size: cover;
	}
</style>
