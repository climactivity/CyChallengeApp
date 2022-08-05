<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
</script>

<VSection {...$$props}>
	<div class="grid grid-flow-col" style="grid-template-columns: 4fr 1fr;">
		<div class="flex flex-col">
			<div class="text-4xl font-serif font-semibold text-storm-dark">
				<slot name="title" />
			</div>
			<div class="text-md font-serif font-normal text-storm-dark">
				<slot name="description" />
			</div>
		</div>
		<div class="relative">
			<div class="absolute w-40 h-40 -top-10 -left-12  text-storm-dark bg-red-500">
				<slot name="icon" />
			</div>
		</div>
	</div>
</VSection>
