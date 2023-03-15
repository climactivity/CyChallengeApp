<script lang="ts">
	import {
		getChallengeState,
		instanceOfChallengeAccept,
		instanceOfChallengeBookmark,
		instanceOfChallengeComplete,
		instanceOfChallengeReject,
		type ChallengeInteraction
	} from '$lib/services/challenge-storage';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { onMount } from 'svelte';
	import ChallengeCard from './challenge-card.svelte';

	export let title = '';
	export let challenges: ChallengeV2[] = [];
	let _challenges = [];
	export let challengeHidden: (ChallengeV2) => boolean;
	export let tags = {};
	export let pad = false;
	export let isRecommendation = false;
	export let sizeW = '12rem';
	export let sizeH = '9rem';
	onMount(async () => {
		const _fusedChallenges = await Promise.all(
			challenges.map(async (value) => {
				const challengeState = await getChallengeState(value.slug);
				return { challenge: value, challengeState: challengeState };
			})
		);

		_challenges = [..._fusedChallenges.sort(sortChallenges)];
	});

	const sortChallenges = (
		a: { challenge: ChallengeV2; challengeState: ChallengeInteraction },
		b: { challenge: ChallengeV2; challengeState: ChallengeInteraction }
	) => {
		const chScore = (chs: { challenge: ChallengeV2; challengeState: ChallengeInteraction }) => {
			const { challenge: ch, challengeState: s } = chs;
			let score = 0;

			if (ch.lead) {
				score -= 100;
			}

			if (s == null || s == undefined) {
				score += 50;
			} else if (instanceOfChallengeReject(s)) {
				score += 200;
			} else if (instanceOfChallengeBookmark(s)) {
				score += 25;
			} else if (instanceOfChallengeAccept(s)) {
				score += 0;
			} else if (instanceOfChallengeComplete(s)) {
				score += 150;
			}
			return score;
		};

		let aValue = chScore(a);
		let bValue = chScore(b);

		return aValue - bValue;
	};
</script>

{#if _challenges.length > 0}
	<div class="">
		<!-- get the nice, readable topic title-->
		<div class="text-lg font-light font-serif {pad ? 'px-4' : ''}">{title}</div>
		<div
			class="py-2 grid grid-flow-col gap-4 overflow-x-scroll place-items-stretch {pad
				? 'px-4'
				: ''} h-scroller snaps-inline rou"
			style="
            grid-auto-columns: {sizeW};
            grid-auto-rows: {sizeH};
        "
		>
			{#if _challenges && _challenges.length > 0}
				{#each _challenges as challenge}
					<ChallengeCard
						challenge={challenge.challenge}
						challengeState={challenge.challengeState}
						isHidden={challengeHidden}
						{tags}
						{isRecommendation}
					/>
				{/each}
			{/if}
		</div>
	</div>
{/if}
