<script lang="ts">
	import type { ChallengeComplete } from '$lib/services/challenge-storage';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import MedalIcon from './medal-icon.svelte';
	export let challenge: ChallengeV2;
	export let challengeState: ChallengeComplete;
	export let skipped = false;
	export let index = 0;

	const getCompletions = (challengeState: ChallengeComplete): number => {
		if (!challengeState) {
			return 0;
		}
		if (challengeState.completions) {
			const compl = challengeState.completions.length;
			if (compl > 6) {
				return Math.floor(compl / 6);
			} else {
				return compl;
			}
		} else {
			if (challengeState.type === 'complete') {
				return 1;
			} else {
				return 0;
			}
		}
	};

	const isFractionalCompletion = (challengeState: ChallengeComplete) => {
		if (!challengeState) {
			return false;
		}
		if (challengeState.completions) {
			const compl = challengeState.completions.length;
			if (compl < 6) {
				return true;
			}
		}
		return false;
	};
	let fractionalCompletion = false;
	let numCompletions = 0;
	$: fractionalCompletion = isFractionalCompletion(challengeState);
	$: numCompletions = getCompletions(challengeState);
</script>

{#if challenge.type === 'recurring'}
	<div class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-items-center relative ring-effect">
		<div class={isFractionalCompletion ? 'text-storm-dark opacity-60' : 'text-green-600'}>
			<MedalIcon />
		</div>
		<svg class="ring-container" style="--segments-completed: {numCompletions}">
			<mask id="clip-completed">
				<rect
					rx="32"
					ry="32"
					class="clip-path-rect"
					pathLength="144"
					stroke="black"
					stroke-dasharray="144"
					stroke-dashoffset={288 - numCompletions * 24}
					fill="white"
				/>
			</mask>
			<mask id="clip-line">
				<rect
					rx="32"
					ry="32"
					class=" clip-path-rect "
					pathLength="144"
					stroke="black"
					stroke-dasharray="144"
					stroke-dashoffset="144"
					fill="white"
				/>
			</mask>

			<rect
				rx="32"
				ry="32"
				class="circle-thing"
				id="ring-line"
				stroke-linecap="round"
				pathLength="144"
				mask="url(#clip-line)"
			/>

			<rect
				rx="32"
				ry="32"
				class="circle-thing"
				id="ring-completed"
				stroke-linecap="round"
				pathLength="144"
				mask="url(#clip-completed)"
			/>
		</svg>
	</div>
	<span class="text-sm font-sans text-center">{numCompletions} von 6</span>
{:else}
	<div
		class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-items-center relative  ring-effect ring-green-600 ring-1 rounded-full"
	>
		<div class="text-green-600 ">
			<MedalIcon />
		</div>
	</div>
	<div class="font-bold text-sm font-sans text-center">Geschafft</div>
{/if}

<style lang="scss">
	.ring-effect {
		--container-overflow: 100px;
		--ring-line-color: #000;
		--ring-completed-color: rgb(22 163 74);
		--ring-open-color: rgb(74 74 73);
		--ring-line-width: 3px;
		--path-length: 144;

		--ring-path-segments: 6;
		--ring-path-offset: -3;
		--ring-line-length: 18;

		--segments-completed: 3;
	}

	.ring-container {
		pointer-events: none;
		position: absolute;
		width: calc(100% + var(--container-overflow));
		height: calc(100% + var(--container-overflow));
		inset: calc(var(--container-overflow) * -1 / 2);
	}

	.circle-thing {
		width: calc(100% - var(--container-overflow));
		height: calc(100% - var(--container-overflow));
		x: calc(var(--container-overflow) / 2);
		y: calc(var(--container-overflow) / 2);
	}

	.clip-path-rect {
		stroke-width: 10px;
		--additional-margin: 5px;
		width: calc(var(--additional-margin) + 100% - var(--container-overflow));
		height: calc(var(--additional-margin) + 100% - var(--container-overflow));
		x: calc(var(--container-overflow) / 2 - var(--additional-margin) / 2);
		y: calc(var(--container-overflow) / 2 - var(--additional-margin) / 2);
		transition: stroke-dashoffset 2500ms;
	}
	#ring-line,
	#ring-completed {
		fill: transparent;

		stroke: var(--ring-line-color);
		stroke-width: var(--ring-line-width - 2px);
	}

	#ring-completed {
		stroke: var(--ring-completed-color);
		stroke-width: var(--ring-line-width);
		stroke-dashoffset: var(--ring-path-offset);
		stroke-dasharray: var(--ring-line-length)
			calc(calc(var(--path-length) / var(--ring-path-segments)) - var(--ring-line-length));
	}

	#ring-line {
		stroke: var(--ring-open-color);
		stroke-dashoffset: var(--ring-path-offset);
		stroke-dasharray: var(--ring-line-length)
			calc(calc(var(--path-length) / var(--ring-path-segments)) - var(--ring-line-length));
	}
</style>
