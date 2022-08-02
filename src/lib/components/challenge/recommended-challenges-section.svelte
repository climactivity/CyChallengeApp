<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
	export let rejected: boolean = false;
</script>

<VSection {...$$props}>
	<div class="font-serif font-semibold text-xl">
		{rejected
			? 'Andere Challenges, die dich statt dessen interessieren könnten'
			: 'Andere Challenges, die dich auch interessieren könnten'}
	</div>
</VSection>
