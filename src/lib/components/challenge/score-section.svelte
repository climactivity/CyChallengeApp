<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
</script>

<VSection {...$$props}>
	<div class="grid grid-flow-col" style="grid-template-columns: 4fr 1fr;">
		<div class="flex flex-col">
			<div class="text-4xl font-serif font-semibold text-storm-dark">Klasse!</div>
			<div class="text-md font-serif font-normal text-storm-dark">Das machst du schon</div>
		</div>
		<div class=" text-storm-dark">
			<slot name="icon" />
		</div>
	</div>
</VSection>
