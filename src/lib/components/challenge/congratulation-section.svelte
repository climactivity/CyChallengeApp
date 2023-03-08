<script lang="ts">
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeComplete, ChallengeInteraction } from '$lib/services/challenge-storage';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import ChallengeProgressBadge from './challenge-progress-badge.svelte';
	export let challenge: ChallengeV2;
	export let challengeState: ChallengeComplete;
	export let skipped = false;
	export let index = 0;
</script>

<div
	class="px-4 py-4  w-full  grid grid-flow-col animate-fadeInUp opacity-0 "
	style="grid-template-columns: 4fr 1fr; animation-delay: {index * ANIMATION_BASE_SPEED}ms;"
>
	<div class="flex flex-col  place-content-center">
		<div class="text-4xl font-serif font-semibold text-storm-dark">Klasse!</div>
		<div class="text-md font-serif font-normal text-storm-dark">
			{skipped ? 'Das machst du schon' : 'Du hast es geschafft'}
		</div>
	</div>
	<div class="grid grid-flow-row items-center place-items-center  px-4 py-2 rounded-xl text-reward">
		<ChallengeProgressBadge {challenge} {challengeState} />
	</div>
</div>
