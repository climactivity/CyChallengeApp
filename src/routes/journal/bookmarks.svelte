<script lang="ts">
	import { goto } from '$app/navigation';
	import { customFly } from '$lib/animations/better-animation';

	import { nkReady } from '$lib/client';
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import ChallengeJournalCard from '$lib/components/journal/challenge-journal-card.svelte';
	import { getChallengeBySlug } from '$lib/services/challenge-content';
	import { getAcceptedChallenges, getBookmarkedChallenges } from '$lib/services/challenge-storage';
	import { fade, fly, scale, slide } from 'svelte/transition';

	let activeChallenge = [];

	nkReady.subscribe(async (value) => {
		if (value) {
			let { interactions, cursor } = await getBookmarkedChallenges();
			console.log('interactions', interactions);
			activeChallenge = await Promise.all(
				interactions.map(async (interaction) => {
					const challenge = await getChallengeBySlug(interaction.challengeSlug);
					return {
						interaction,
						challenge
					};
				})
			);
		}
	});
</script>

<div
	class="px-4 py-4 gap-4 grid grid-flow-row"
	in:scale={{ delay: 250, duration: 250, start: 0.8 }}
	out:scale={{ delay: 0, duration: 250, start: 0.8 }}
>
	{#if activeChallenge.length > 0}
		{#each activeChallenge as activeChallenge, i}
			<ChallengeJournalCard
				index={i}
				challenge={activeChallenge.challenge}
				challengeState={activeChallenge.interaction}
				onClick={() => {
					console.log('clicked');
					goto('/challenge/' + activeChallenge.challenge.slug);
				}}
			/>
		{/each}
	{:else}
		<div class="min-h-full px-4">
			<svg
				class="w-full my-4  text-storm-light rotate-6"
				viewBox="-5 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0.5 5C0.5 3.67392 1.02678 2.40215 1.96447 1.46447C2.90215 0.526784 4.17392 0 5.5 0L25.5 0C26.8261 0 28.0979 0.526784 29.0355 1.46447C29.9732 2.40215 30.5 3.67392 30.5 5V38.75C30.4999 38.9761 30.4384 39.1979 30.3222 39.3919C30.206 39.5858 30.0393 39.7446 29.84 39.8513C29.6407 39.9581 29.4161 40.0087 29.1903 39.9979C28.9644 39.9871 28.7457 39.9153 28.5575 39.79L15.5 32.7525L2.4425 39.79C2.25426 39.9153 2.03558 39.9871 1.80973 39.9979C1.58388 40.0087 1.35933 39.9581 1.16 39.8513C0.960665 39.7446 0.79401 39.5858 0.677785 39.3919C0.56156 39.1979 0.500117 38.9761 0.5 38.75V5ZM5.5 2.5C4.83696 2.5 4.20107 2.76339 3.73223 3.23223C3.26339 3.70107 3 4.33696 3 5V36.415L14.8075 30.21C15.0127 30.0735 15.2536 30.0006 15.5 30.0006C15.7464 30.0006 15.9873 30.0735 16.1925 30.21L28 36.415V5C28 4.33696 27.7366 3.70107 27.2678 3.23223C26.7989 2.76339 26.163 2.5 25.5 2.5H5.5Z"
					fill="currentColor"
				/>
				<path
					d="M15.5 10C15.8315 10 16.1495 10.1317 16.3839 10.3661C16.6183 10.6005 16.75 10.9185 16.75 11.25V15H20.5C20.8315 15 21.1495 15.1317 21.3839 15.3661C21.6183 15.6005 21.75 15.9185 21.75 16.25C21.75 16.5815 21.6183 16.8995 21.3839 17.1339C21.1495 17.3683 20.8315 17.5 20.5 17.5H16.75V21.25C16.75 21.5815 16.6183 21.8995 16.3839 22.1339C16.1495 22.3683 15.8315 22.5 15.5 22.5C15.1685 22.5 14.8505 22.3683 14.6161 22.1339C14.3817 21.8995 14.25 21.5815 14.25 21.25V17.5H10.5C10.1685 17.5 9.85054 17.3683 9.61612 17.1339C9.3817 16.8995 9.25 16.5815 9.25 16.25C9.25 15.9185 9.3817 15.6005 9.61612 15.3661C9.85054 15.1317 10.1685 15 10.5 15H14.25V11.25C14.25 10.9185 14.3817 10.6005 14.6161 10.3661C14.8505 10.1317 15.1685 10 15.5 10Z"
					fill="currentColor"
				/>
			</svg>

			<div class="text-center font-serif font-semibold py-4">
				Du hast noch keine gespeicherten Challenges
			</div>
			<div class="text-left py-4">
				Du kannst dir Challenges mit dem
				<svg
					class="h-6 w-6 inline"
					viewBox="-5 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.5 5C0.5 3.67392 1.02678 2.40215 1.96447 1.46447C2.90215 0.526784 4.17392 0 5.5 0L25.5 0C26.8261 0 28.0979 0.526784 29.0355 1.46447C29.9732 2.40215 30.5 3.67392 30.5 5V38.75C30.4999 38.9761 30.4384 39.1979 30.3222 39.3919C30.206 39.5858 30.0393 39.7446 29.84 39.8513C29.6407 39.9581 29.4161 40.0087 29.1903 39.9979C28.9644 39.9871 28.7457 39.9153 28.5575 39.79L15.5 32.7525L2.4425 39.79C2.25426 39.9153 2.03558 39.9871 1.80973 39.9979C1.58388 40.0087 1.35933 39.9581 1.16 39.8513C0.960665 39.7446 0.79401 39.5858 0.677785 39.3919C0.56156 39.1979 0.500117 38.9761 0.5 38.75V5ZM5.5 2.5C4.83696 2.5 4.20107 2.76339 3.73223 3.23223C3.26339 3.70107 3 4.33696 3 5V36.415L14.8075 30.21C15.0127 30.0735 15.2536 30.0006 15.5 30.0006C15.7464 30.0006 15.9873 30.0735 16.1925 30.21L28 36.415V5C28 4.33696 27.7366 3.70107 27.2678 3.23223C26.7989 2.76339 26.163 2.5 25.5 2.5H5.5Z"
						fill="currentColor"
					/>
					<path
						d="M15.5 10C15.8315 10 16.1495 10.1317 16.3839 10.3661C16.6183 10.6005 16.75 10.9185 16.75 11.25V15H20.5C20.8315 15 21.1495 15.1317 21.3839 15.3661C21.6183 15.6005 21.75 15.9185 21.75 16.25C21.75 16.5815 21.6183 16.8995 21.3839 17.1339C21.1495 17.3683 20.8315 17.5 20.5 17.5H16.75V21.25C16.75 21.5815 16.6183 21.8995 16.3839 22.1339C16.1495 22.3683 15.8315 22.5 15.5 22.5C15.1685 22.5 14.8505 22.3683 14.6161 22.1339C14.3817 21.8995 14.25 21.5815 14.25 21.25V17.5H10.5C10.1685 17.5 9.85054 17.3683 9.61612 17.1339C9.3817 16.8995 9.25 16.5815 9.25 16.25C9.25 15.9185 9.3817 15.6005 9.61612 15.3661C9.85054 15.1317 10.1685 15 10.5 15H14.25V11.25C14.25 10.9185 14.3817 10.6005 14.6161 10.3661C14.8505 10.1317 15.1685 10 15.5 10Z"
						fill="currentColor"
					/>
				</svg>

				button vormerken
			</div>
			<ButtonPrimaryCta onClick={() => goto('/challenges')}>Nimm dir welche vor</ButtonPrimaryCta>
			<div class=" h-40" />
		</div>
	{/if}
</div>
