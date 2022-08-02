<script lang="ts">
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';

	import type { ChallengeV2 } from '$lib/types/challenges';

	export let last = false;
	export let index = 0;
	export let challenge: ChallengeV2 = undefined;
</script>

<div
	class=" my-4 py-4 px-4 {last
		? 'border-b-0'
		: 'border-b'} border-stone-200 animate-fadeInUp opacity-0"
	style="animation-delay: {index * ANIMATION_BASE_SPEED}ms;"
>
	<slot />
</div>
