<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
</script>

<VSection {...$$props}>
	<div class="flex flex-row">
		<div class="flex flex-col">
			<slot name="title" />
			<slot name="description" />
		</div>
		<div>
			<slot name="icon" />
		</div>
	</div>
</VSection>
