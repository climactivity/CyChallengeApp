<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
</script>

<VSection {...$$props}>
	<div class="text-2xl text-bold font-semibold font-serif">Wir gucken wie es dir geht am:</div>
	<div>
		<form>
			<!-- todo replace -->
			<input type="datetime-local" />
		</form>
	</div>

	<div>
		<button> Erinnere mich nicht </button>
	</div>
</VSection>
