<script lang="ts">
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';
	import type { ChallengeComplete, ChallengeInteraction } from '$lib/services/challenge-storage';
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

<!-- {#if isFractionalCompletion}
	{''}
{:else}
	<div class=" w-full 0">
		<svg
			class="h-20 w-20 mx-auto"
			viewBox="0 0 76 76"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M37.9997 69.6663C50.2198 69.6663 60.1663 59.7198 60.1663 47.4997C60.1663 35.2795 50.2198 25.333 37.9997 25.333C25.7763 25.333 15.833 35.2795 15.833 47.4997C15.833 59.7198 25.7763 69.6663 37.9997 69.6663ZM37.9997 31.6663C46.7302 31.6663 53.833 38.7692 53.833 47.4997C53.833 56.2302 46.7302 63.333 37.9997 63.333C29.2692 63.333 22.1663 56.2302 22.1663 47.4997C22.1663 38.7692 29.2692 31.6663 37.9997 31.6663ZM34.833 6.33301H22.1663V23.8067C25.9558 21.2709 30.3008 19.6861 34.833 19.1865V6.33301ZM53.833 6.33301H41.1663V19.1865C45.6985 19.6861 50.0435 21.2709 53.833 23.8067V6.33301Z"
				fill="currentColor"
			/>
			<path
				d="M31.7265 50.0678L30.2445 58.7002L37.9997 54.6247L45.7549 58.7002L44.2729 50.0678L50.5492 43.9498L41.8789 42.6895L37.9997 34.833L34.1205 42.6895L25.4502 43.9498L31.7265 50.0678Z"
				fill="currentColor"
			/>
		</svg>
	</div>
{/if} -->
{#if challenge.type === 'recurring'}
	<div class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-items-center relative ring-effect">
		<div class={isFractionalCompletion ? 'text-gray-400' : 'text-green-600'}>
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
			<!-- <rect
				rx="32"
				ry="32"
				class="clip-path-rect clip-path-rect-completed"
				pathLength="144"
				stroke="black"
				stroke-dasharray="144"
				fill="white"
				stroke-dashoffset={288 - 24}
			/> -->
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
	<span class="text-sm font-sans text-center">{fractionalCompletion} {numCompletions}</span>
{:else}
	<div class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-items-center relative ring-effect">
		<div class="text-green-600">
			<MedalIcon />
		</div>
	</div>
	<div class="text-4xl font-bold">Geschafft</div>
{/if}

<style lang="scss">
	.ring-effect {
		--container-overflow: 100px;
		--ring-line-color: #000;
		--ring-completed-color: rgb(22 163 74);
		--ring-open-color: #aaa;
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

	.clip-path-rect-completed {
		// stroke-dashoffset: calc(0 - (var(--segments-completed) * 24));
	}

	// .ring-effect:hover .clip-path-rect-completed {
	// 	transition: stroke-dashoffset 2500ms;
	// 	stroke-dashoffset: -144;
	// }

	.clip-path-rect-line {
		// stroke-dashoffset: calc(-144 - (var(--segments-completed) * 24));
	}

	// .ring-effect:hover .clip-path-rect-line {
	// 	transition: stroke-dashoffset 2500ms;
	// 	stroke-dashoffset: -288;
	// }

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
		// stroke-width: calc(var(--ring-line-width) - 1px);

		stroke-dashoffset: var(--ring-path-offset);
		stroke-dasharray: var(--ring-line-length)
			calc(calc(var(--path-length) / var(--ring-path-segments)) - var(--ring-line-length));
	}
</style>
