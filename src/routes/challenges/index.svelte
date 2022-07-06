<script lang="ts" context="module">
	import { availableChallenges } from '$testData/challenges';
	export async function load({ params, fetch, session, stuff }) {
		return {
			status: 200,
			props: {
				data: availableChallenges
			}
		};
	}
</script>

<script lang="ts">
	import type { AcceptedChallenge, ChallengeV2 } from '$lib/types/challenges';
	import { fly, slide } from 'svelte/transition';

	let insets: Writable<any> = getContext('insets');

	import { headerState } from '$lib/stores/header-store';
	import HeaderBar from '$lib/components/header-bar.svelte';
	import type { Writable } from 'svelte/store';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Confetti from '$lib/components/particles/confetti.svelte';

	headerState.set({
		backbutton: false,
		title: 'Card Demo',
		hidden: false
	});

	export let data: ChallengeV2[];

	let filter = [];

	let tags = {
		big_point: 'Big Point',
		easy_action: 'Easy Action',
		save_money: 'Save Money',
		empty_tag: 'Empty Tag'
	};

	// get tag name from tags
	const getTagName = (tag: string) => {
		return tags[tag];
	};

	const addFilterTag = (tag: string) => {
		filter = filter.includes(tag) ? filter.filter((item) => item !== tag) : [...filter, tag];
	};

	$: console.log(filter);

	let playAt;

	let _navIndex = 100;
	let offset = 200;
</script>

<div class="relative " style="margin-top: {$insets.top}px">
	<div class="absolute top-0 left-0 right-0 z-30">
		<HeaderBar />
	</div>

	<div
		class=" pt-16 py-4 overflow-x-hidden  h-screen pb-16 relative top-0 left-0 right-0  bg-sector-food bg-sector  z-20 "
	>
		<div
			class=" select-none flex flex-row justify-start gap-4 items-center my-4  md:mx-auto md:max-w-3xl px-4 flex-nowrap overflow-x-auto "
		>
			{#each Object.keys(tags) as tag}
				<div
					on:click={() => addFilterTag(tag)}
					class="text-sm whitespace-nowrap px-4 py-2 rounded-full  cursor-pointer select-none {filter.includes(
						tag
					)
						? 'bg-water border-0 text-white font-bold'
						: 'bg-gray-200 border border-gray-400 text-gray-600'}"
				>
					{getTagName(tag)}
				</div>
			{/each}
		</div>
		<div class="container">
			{#each data as availableChallenge}
				<div
					class:hidden={filter.length > 0 &&
						!filter.every((r) => availableChallenge.tags.includes(r))}
					class="ch_card fadedownin flex {availableChallenge.tags.includes('big_point')
						? 'card-2x1 bg-image'
						: ''}"
					on:click={() => {
						goto(`/challenge/${availableChallenge.slug}`);
					}}
				>
					<span>{availableChallenge.title}</span>
					<div class="flex flex-row flex-wrap">
						{#each availableChallenge.tags as tag}
							{#if availableChallenge.tags.includes('big_point')}
								<div class="card_tag_inverted ">{getTagName(tag)}</div>
							{:else}
								<div class="card_tag ">{getTagName(tag)}</div>
							{/if}
						{/each}
					</div>

					<!-- {JSON.stringify(availableChallenge)} -->
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		max-width: 768px;
		margin: auto;
		display: grid;
		grid-auto-flow: row dense;
		grid-auto-rows: minmax(100px, max-content);
		grid-template-columns: repeat(2, minmax(0, 1fr));
		overflow-y: auto;
		padding: 1rem;
		gap: 1rem;
	}

	.ch_card {
		background: white;
		border-radius: 20px;
		// box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
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
	}

	.bg-image {
		font-weight: bold;
		color: white;
		font-family: 'poppins';

		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)),
			url('https://picsum.photos/400');
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
