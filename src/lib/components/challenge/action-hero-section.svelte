<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
</script>

<VSection {...$$props}>
	<div class="grid grid-flow-col px-0" style="grid-template-columns: 1fr 100px;">
		<div class="flex flex-col">
			<div class="text-4xl font-serif font-bold text-black text-opacity-60">
				<slot name="title" />
			</div>
			<div class="text-md font-serif font-normal text-black text-opacity-50">
				<slot name="description" />
			</div>
		</div>
		<div class="w-full h-full grid place-content-center-center text-storm-dark">
			<slot name="icon" />
		</div>
	</div>
</VSection>
