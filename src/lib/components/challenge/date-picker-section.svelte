<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import {
		acceptChallenge,
		currentLevelForChallenge,
		getChallengeState
	} from '$lib/services/challenge-storage';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;

	let selectedDate = '';

	const setNewNextCheckpoint = (challenge, date) => {
		console.log('setNewNextCheckpoint', challenge.slug, date);
		acceptChallenge(
			challenge,
			currentLevelForChallenge(challenge, getChallengeState(challenge.slug)),
			date
		);
	};
</script>

<VSection {...$$props}>
	<div class="text-2xl text-bold font-semibold font-serif">Wir gucken wie es dir geht am:</div>
	<div>
		<form>
			<!-- todo replace -->
			<input
				type="datetime-local"
				bind:value={selectedDate}
				on:change={() => setNewNextCheckpoint(challenge, selectedDate)}
			/>
		</form>
	</div>

	<div>
		<button> Erinnere mich nicht </button>
	</div>
</VSection>
