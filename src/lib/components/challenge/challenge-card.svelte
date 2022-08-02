<script lang="ts">
	import type { AcceptedChallenge, ChallengeV2 } from '$lib/types/challenges';
	import type { Writable } from 'svelte/store';
	import { randomIntBetween } from '$lib/util';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let challenge: ChallengeV2;

	let imageUrl = 'https://picsum.photos/id/' + randomIntBetween(1, 1000) + '/200/200';
	$: {
		imageUrl = challenge.image?.file?.path ?? undefined;
		// console.log('image', challenge.image?.file?.path, $page.url);
	}
	export let isHidden: (ChallengeV2) => boolean = (challenge) => false;
	export let tags;
</script>

<div
	class:hidden={isHidden(challenge)}
	class="ch-card shadow-nature fadedownin flex card-2x2  bg-image"
	style={imageUrl
		? `--bg-image: url(${$page.url.origin + '/' + imageUrl})`
		: `--bg-image: url(https://picsum.photos/${randomIntBetween(500, 1000)})`}
	on:click={() => {
		goto(`/challenge/${challenge.slug}`);
	}}
>
	<span>{challenge.title}</span>
	<div class="flex flex-row flex-wrap">
		<!-- {#each challenge.topic as topic} -->
		{#if challenge.impact === 'Big Point'}
			<div class="card_tag_inverted ">{tags[challenge.topic]}</div>
		{:else}
			<div class="card_tag ">{tags[challenge.topic]}</div>
		{/if}
		<!-- {/each} -->
	</div>

	<!-- {JSON.stringify(tags)} -->
</div>

<style lang="scss">
	.fadedownin {
		animation-duration: 500ms;
		animation-delay: calc(var(--position) * 75ms);
		animation-name: fadedownin;
		animation-fill-mode: both;
		opacity: 0;
	}

	@keyframes fadedownin {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}

		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	.card .card-title::before {
		content: counter(card) '. ';
	}

	.card-2x2 {
		grid-column: span 2 / span 2;
		grid-row: span 2 / span 2;
		justify-content: space-evenly;
		@apply text-xl;
	}

	.card-4x2 {
		grid-column: span 4 / span 4;
		grid-row: span 2 / span 2;
	}

	.card-4x4 {
		grid-column: span 4 / span 4;
		grid-row: span 4 / span 4;
	}

	.card-2x1 {
		grid-column: span 2 / span 2;
	}

	.card-1x2 {
		grid-row: span 2 / span 2;
		min-height: 200px;
	}

	.card_tag {
		white-space: nowrap;
		font-weight: 300;
		@apply text-xs text-gray-600 bg-gray-100 rounded-full my-1 mx-1 px-1;
	}

	.card_tag_inverted {
		white-space: nowrap;
		font-weight: 300;
		@apply text-xs text-gray-600 bg-gray-100 rounded-full my-1 mx-1 px-2 py-1;
	}

	.card_tag_selected {
		@apply text-gray-900 bg-gray-200;
	}
</style>
