<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import {
		acceptChallenge,
		currentLevelForChallenge,
		getChallengeState,
		type ChallengeAccept
	} from '$lib/services/challenge-storage';
	import { DateTime } from 'luxon';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { onMount } from 'svelte';
	import { scheduleNotification, unscheduleNotification } from '$lib/push-notifications';
	export let challenge: ChallengeV2;

	let isReminding = true;
	let nextCheckpoint;
	let selectedDate = '';
	export let onchanged = (date) => {};
	const setNewNextCheckpoint = async (challenge, date) => {
		console.log('setNewNextCheckpoint', challenge.slug, date);

		const accept = await acceptChallenge(
			challenge,
			currentLevelForChallenge(challenge, getChallengeState(challenge.slug)),
			date
		);

		if (date === null) {
			unscheduleNotification(challenge.slug);
			return;
		}
		let message = challenge.reminderText ?? `Erinnerung an ${challenge.title}`;
		if (!message) {
			console.error('no notification message found!');
			return;
		}
		let oneSignalResult = await scheduleNotification(message, date, challenge.slug);
		console.log('schedule Notification result:', oneSignalResult);
	};

	const calcDateOptionsForChallenge = (challenge: ChallengeV2) => {
		const dateTime = DateTime.now().setZone('Europe/Berlin');
		const { type, notificationDays } = challenge;

		console.log('calcDateOptionsForChallenge', challenge);
		if (type === 'one-time' || type === 'repeatable') {
			// terrible fix for "" notification days (which should not be a thing, b/c types)
			if ((notificationDays as unknown as string) === '') {
				const result = dateTime.plus({ days: 7 }).startOf('day').plus({ hours: 16 });

				return [
					{
						value: result.toFormat("yyyy-MM-dd'T'HH:mm"),
						display: `${result.toRelativeCalendar()}`
					}
				];
			}
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

	const toggleReminder = () => {
		if (isReminding) {
			setNewNextCheckpoint(challenge, null);
			isReminding = false;
			onchanged(null);
		} else {
			let days = 7;
			const date = DateTime.now()
				.setZone('Europe/Berlin')
				.plus({ days })
				.startOf('day')
				.plus({ hours: 16 })
				.toFormat("yyyy-MM-dd'T'HH:mm");

			onchanged(date);

			setNewNextCheckpoint(challenge, date);
			isReminding = true;
		}
	};

	onMount(async () => {
		let challengeState = await getChallengeState(challenge.slug);
		nextCheckpoint = challengeState.nextCheckpoint ?? null;
		isReminding = nextCheckpoint !== null;
	});
</script>

<VSection {...$$props}>
	<div class="mx-4 space-y-4">
		{#if challenge.type === 'one-time' || challenge.type === 'repeatable'}
			<form class="space-y-4">
				<label for="date-select" class="block text-2xl text-bold font-semibold font-serif">
					Wir gucken wie es dir geht am:
				</label>

				<select
					name="dates"
					id="date-select"
					class="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-water2 focus:outline-none focus:border-water2-light"
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
		{:else}
			{#if isReminding}
				<div>Wir erinnern dich wöchentlich wegen <b>{challenge.title}</b></div>
			{:else}
				<div>Wir erinnern dich nicht wegen <b>{challenge.title}</b></div>
			{/if}
			<!-- <form>
				<label for="date-select" class="block text-2xl text-bold font-semibold font-serif">
					Wir gucken wie es dir geht am:
				</label>
				<input
					type="datetime-local"
					bind:value={selectedDate}
					on:change={() => {
						onchanged(selectedDate);
						setNewNextCheckpoint(challenge, selectedDate);
					}}
				/>
			</form> -->
		{/if}

		<div class="flex flex-row-reverse">
			<button class="block text-sm text-water2" on:click={toggleReminder}>
				Erinnere mich {isReminding ? 'nicht' : ''}
			</button>
		</div>
	</div>
</VSection>
