<script lang="ts">
	import { getDeviceID } from '$lib/client';
	import VSection from '$lib/components/challenge/v-section.svelte';
	import { writeStorage } from '$lib/services/client-storage-engine';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { fade } from 'svelte/transition';
	export let challenge: ChallengeV2;

	let reason;
	let message = '';

	let rejectionRecorded = false;
	let submitting = false;
	const saveRejectReason = async (challenge, reason, message) => {
		submitting = true;
		const deviceId = await getDeviceID();
		const key = `${challenge.slug}-${deviceId}`;
		await writeStorage(
			'challenge-rejects',
			key,
			{
				challenge,
				reason,
				message
			},
			null,
			1,
			1
		).catch((e) => console.error(e));
		rejectionRecorded = true;
		submitting = false;
	};
</script>

<VSection {...$$props}>
	<div class="grid grid-flow-col ">
		{#if rejectionRecorded}
			<div transition:fade>Danke, wir haben dein Feedback erhalten!</div>
		{:else}
			<form class="w-full gap-4 flex flex-col">
				<label for="reason"
					>Warum nicht?
					<select class="w-full" name="reason" id="reason" bind:value={reason}>
						<option />

						<option value="cant">Kann ich nicht machen</option>
						<option value="wont">Will ich nicht machen</option>
						<option value="message">Anderer Grund</option>
					</select>
				</label>
				{#if reason}
					{#if reason === 'message'}
						<label for="reason"
							>Anderer Grund

							<input
								class="w-full rounded px-2 py-2  animate-fadeInDown"
								type="textarea"
								bind:value={message}
								rows="2"
							/>
						</label>
					{/if}
					<div class="w-full flex justify-center flex-col">
						<button
							class=" rounded shadow mx-8  py-2 bg-white text-lg animate-fadeInDown "
							type="submit"
							disabled={submitting}
							on:click|preventDefault={(e) => {
								console.log({
									ch: challenge.slug,
									reason,
									message
								});

								saveRejectReason(challenge, reason, message);
							}}
						>
							{submitting ? 'Sende Feedback...' : 'Absenden'}
						</button>
					</div>
				{/if}
			</form>
		{/if}
	</div>
</VSection>
