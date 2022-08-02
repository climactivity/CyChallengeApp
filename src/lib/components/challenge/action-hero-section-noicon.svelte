<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
</script>

<VSection {...$$props}>
	<div
		class="grid grid-flow-col bg-white rounded-xl border-2 border-storm-lightest py-8 px-8 place-content-center"
	>
		<div class="flex flex-col">
			<div class="text-4xl font-serif font-semibold text-storm-dark">
				<slot name="title" />
			</div>
			<div class="text-md font-serif font-normal text-storm-dark">
				<slot name="description" />
			</div>
		</div>
	</div>
</VSection>
