<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import {
		acceptChallenge,
		currentLevelForChallenge,
		getChallengeState
	} from '$lib/services/challenge-storage';
	import { DateTime } from 'luxon';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;

	let selectedDate = '';
	export let onchanged = (date) => {};
	const setNewNextCheckpoint = (challenge, date) => {
		console.log('setNewNextCheckpoint', challenge.slug, date);
		acceptChallenge(
			challenge,
			currentLevelForChallenge(challenge, getChallengeState(challenge.slug)),
			date
		);
	};

	const calcDateOptionsForChallenge = (challenge: ChallengeV2) => {
		const dateTime = DateTime.now().setZone('Europe/Berlin');
		const { type, notificationDays } = challenge;

		console.log('calcDateOptionsForChallenge', challenge);
		if (type === 'one-time' || type === 'repeatable') {
			return notificationDays.map((days) => {
				const result = dateTime.plus({ days }).startOf('day').plus({ hours: 16 });
				//.toUTC()

				return {
					value: result.toFormat("yyyy-MM-dd'T'HH:mm"),
					display: `${result.toRelativeCalendar()}`
				};
			});
		}

		return [];
	};
</script>

<VSection {...$$props}>
	<div class="text-2xl text-bold font-semibold font-serif">Wir gucken wie es dir geht am:</div>
	<ul />
	<div>
		<form>
			<select
				name="dates"
				id="date-select"
				bind:value={selectedDate}
				on:change={() => {
					onchanged(selectedDate);
					setNewNextCheckpoint(challenge, selectedDate);
				}}
			>
				{#each calcDateOptionsForChallenge(challenge) as day}
					<option value={day.value}>{day.display}</option>
				{/each}
			</select>

			<!-- todo replace -->
			<!-- <input
				type="datetime-local"
				bind:value={selectedDate}
				on:change={() => {
					onchanged(selectedDate);
					setNewNextCheckpoint(challenge, selectedDate);
				}}
			/> -->
		</form>
	</div>

	<div>
		<button> Erinnere mich nicht </button>
	</div>
</VSection>
