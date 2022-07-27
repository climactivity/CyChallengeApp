<script lang="ts">
	import type { AcceptedChallenge, ChallengeV2 } from '$lib/types/challenges';
	import type { Writable } from 'svelte/store';
	import { randomIntBetween } from '$lib/util';
	import { goto } from '$app/navigation';

	export let challenge: ChallengeV2;

	export let filter = [];

	export let tags = {
		big_point: 'Big Point',
		easy_action: 'Easy Action',
		save_money: 'Save Money',
		empty_tag: 'Empty Tag'
	};

	export let topics;
	// get tag name from tags
	const getTagName = (tag: string) => {
		return topics[tag];
	};
</script>

<div
	class:hidden={filter.length > 0 && !filter.every((r) => challenge.topic.includes(r))}
	class="ch_card fadedownin flex card-2x2  {challenge.impact === 'Big Point' ? 'bg-image' : ''}"
	style={challenge.impact === 'Big Point'
		? `--bg-image: url(https://picsum.photos/${randomIntBetween(500, 1000)})`
		: ''}
	on:click={() => {
		goto(`/challenge/${challenge.slug}`);
	}}
>
	<span>{challenge.title}</span>
	<div class="flex flex-row flex-wrap">
		<!-- {#each challenge.topic as topic} -->
		{#if challenge.impact === 'Big Point'}
			<div class="card_tag_inverted ">{topics[challenge.topic]}</div>
		{:else}
			<div class="card_tag ">{topics[challenge.topic]}</div>
		{/if}
		<!-- {/each} -->
	</div>

	<!-- {JSON.stringify(tags)} -->
</div>

<style lang="scss">
	// .container {
	// 	max-width: 768px;
	// 	margin: auto;
	// 	display: grid;
	// 	grid-auto-flow: row dense;
	// 	grid-auto-rows: minmax(100px, max-content);
	// 	grid-template-columns: repeat(2, minmax(0, 1fr));
	// 	// overflow-y: auto;
	// 	padding: 1rem;
	// 	gap: 1rem;
	// }

	.ch_card {
		background: white;
		border-radius: 4px 4px 4px 4rem;
		transition: all 0.2s ease-in-out;
		// display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: 16px;
		cursor: pointer;
		counter-increment: card;
		opacity: 0;
		animation-fill-mode: both;
		box-shadow: 0px 5px 0px 0px green;
		scroll-snap-align: start;

		// @apply shadow-sm;;
	}

	.bg-image {
		font-weight: bold;
		color: white;
		font-family: 'poppins';
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)),
			var(--bg-image, url('https://picsum.photos/400'));
		background-blend-mode: multiply;
	}

	.fadedownin {
		animation-duration: 500ms;
		animation-delay: calc(var(--position) * 75ms);
		animation-name: fadedownin;
		animation-fill-mode: both;
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
