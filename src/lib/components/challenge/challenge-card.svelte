<script lang="ts">
	import type { AcceptedChallenge, ChallengeV2, ImageSource } from '$lib/types/challenges';
	import type { Writable } from 'svelte/store';
	import { getImageUrlFromChallenge, randomIntBetween } from '$lib/util';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		getChallengeState,
		getChallengeUserData,
		instanceOfChallengeAccept,
		instanceOfChallengeBookmark,
		instanceOfChallengeComplete,
		instanceOfChallengeReject,
		type ChallengeInteraction
	} from '$lib/services/challenge-storage';
	import SuperChallengeIcon from '../impact/super-challenge-icon.svelte';
	import { getSuperChallengeDataForLeadChallenge } from '../impact/super-challenge';

	export let challenge: ChallengeV2;
	let challengeStatePromise = getChallengeState(challenge.slug);
	let imageUrl = getImageUrlFromChallenge(challenge, true);
	// $: {
	// 	// imageUrl = challenge.image != 'imageUrl' ? challenge.image?.file?.path ?? undefined : undefined;
	// 	imageUrl = getImageUrlFromChallenge(challenge);
	// 	// console.log('image', challenge.image?.file?.path, $page.url);
	// }
	export let isHidden: (ChallengeV2) => boolean = (challenge) => false;
	export let tags = {};
	// console.log(tags);
	const challengeStatusTag = (status: string) => {
		if (status !== '') {
			status = status.toLowerCase().trim();
			if (status.startsWith('fertig')) {
				return '';
			} else {
				return '*';
			}
		}
		return '*';
	};

	let superChallenge = challenge.lead
		? getSuperChallengeDataForLeadChallenge(challenge.slug)
		: undefined;
</script>

{#await challengeStatePromise then challengeState}
	<div
		class:hidden={isHidden(challenge)}
		class="ch-card-sharp shadow-storm-light animate-fadeInBlur flex  bg-image  relative
				{instanceOfChallengeReject(challengeState) ? 'bg-red-500 shadow-red-500' : ''}
				{instanceOfChallengeBookmark(challengeState) ? 'bg-yellow-500 shadow-yellow-500' : ''}
				{instanceOfChallengeComplete(challengeState) ? 'bg-green-500 shadow-green-500' : ''}
				{instanceOfChallengeAccept(challengeState) ? 'bg-nature shadow-nature' : ''}
				"
		style={`--bg-image: url(${imageUrl})`}
		on:click={() => {
			goto(`/challenge/${challenge.slug}`);
		}}
	>
		<div class="grid grid-flow-col place-content-between w-full">
			<span class=""
				>{challenge.Status ? challengeStatusTag(challenge.Status) : ''}{challenge.title}</span
			>
			{#await superChallenge then sc}
				{#if superChallenge}
					<div>
						<SuperChallengeIcon superChallenge={sc} cssClass={'challenge-card'} />
					</div>
				{/if}
			{/await}
		</div>

		<div
			class="grid grid-flow-row-dense place-content-end items-end justify-end w-full absolute inset-0"
		>
			<!-- {#each challenge.topic as topic} -->
			<!-- {#if tags[challenge.topic]} -->

			{#await tags then tagsResloved}
				{#each challenge.tags as tag}
					{#if challenge.impact === 'Big Point'}
						<div class="card_tag ">{tagsResloved[tag] ?? tag}</div>
					{:else}
						<div class="card_tag ">{tagsResloved[tag] ?? tag}</div>
					{/if}
				{/each}
			{/await}
			<!-- {/if} -->
			<!-- {/each} -->
		</div>
	</div>
{/await}

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
		// justify-content: space-evenly;
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
		@apply text-[.6rem] text-black font-medium bg-gray-100 rounded-full my-[0.125rem] mx-1 px-1;
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
