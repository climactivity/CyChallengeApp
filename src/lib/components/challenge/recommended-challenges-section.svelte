<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
</script>

<VSection {...$$props}>
	<div class="font-serif font-semibold text-xl">
		Andere Challenges, die dich interessieren könnten
	</div>
</VSection>
