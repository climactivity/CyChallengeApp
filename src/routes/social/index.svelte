<script lang="ts" context="module">
	import { acceptedChallenges } from '$testData/accepted-challenges';
	export async function load({ params, fetch, session, stuff }) {
		return {
			status: 200,
			props: {
				data: acceptedChallenges
			}
		};
	}
</script>

<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	let insets: Writable<any> = getContext('insets');

	import { headerState } from '$lib/stores/header-store';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	headerState.set({
		backbutton: false,
		title: 'Card demo',
		hidden: false
	});
</script>

<div
	in:fly={{ x: 200, duration: 400 }}
	out:fly={{ x: -200, duration: 400 }}
	class="relative "
	style="margin-top: {$insets.top}px"
>
	<div
		class=" pt-16 py-4 overflow-x-hidden  h-screen pb-16 relative top-0 left-0 right-0  bg-sector-food bg-sector  z-20 "
		style=""
	>
		<div
			class="grid grid-flow-row-dense overflow-y-auto grid-cols-4 p-4 gap-2"
			style="grid-auto-rows: minmax(100px, max-content); counter-reset: card;"
		>
			<div class="challenge-card card-4x4" on:click={() => goto('/challenge/v-day')}>
				<span class="card-title">Mache einen veganen Tag</span>
			</div>
			<div class="challenge-card card-2x2">
				<span class="card-title">title</span>
			</div>
			<div class="challenge-card"><span class="card-title">title</span></div>
			<div class="challenge-card"><span class="card-title">title</span></div>
			<div class="challenge-card card-4x2">
				<span class="card-title">title</span>
			</div>
			<div class="challenge-card card-2x1">
				<span class="card-title">title</span>
			</div>
			<div class="challenge-card"><span class="card-title">title</span></div>
			<div class="challenge-card"><span class="card-title">title</span></div>

			<div class="challenge-card"><span class="card-title">title</span></div>
			<div class="challenge-card"><span class="card-title">title</span></div>

			<div class="challenge-card card-1x2">
				<span class="card-title">title</span>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.challenge-card {
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom left, rgba(255, 255, 255, 1), rgb(248, 248, 248));
		border-radius: 20px;
		// box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease-in-out;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 16px;
		cursor: pointer;
		counter-increment: card;
		@apply font-bold text-xl;
	}

	.challenge-card .card-title::before {
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
</style>
