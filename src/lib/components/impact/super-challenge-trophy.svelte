<script lang="ts">
	import { isAllSuperChallengesCompelted } from '$lib/components/impact/super-challenge';
	import { Share, type ShareOptions, type ShareResult } from '@capacitor/share';
	import { fly } from 'svelte/transition';

	const shareState: ShareOptions = {
		dialogTitle: 'climactivity Super Challenge',
		text: 'Ich hast die 7 Super-Challenges geschafft! ',
		title: 'climactivity Super Challenge',
		url: import.meta.env.SUPER_CHALLENGE_SHARE_TARGET ?? 'https://www.climactivity.de/'
	};

	const shareTrophy = async (_e) => {
		const canShare = await Share.canShare();
		if (canShare) {
			const shareResult: ShareResult = await Share.share(shareState);
			console.log(shareResult);
		}
	};
</script>

{#await isAllSuperChallengesCompelted() then isCompleted}
	{#if isCompleted}
		<div
			in:fly={{ delay: 0, y: -20 }}
			class="super-challenge-trophy-card m-4 p-4 border-2 border-black border-opacity-20 bg-white bg-opacity-40 hover:bg-opacity-80 shadow-md font-sans"
		>
			<div class="grid items-center gap-4 grid-flow-row">
				<div class="flex items-center place-content-center flex-col gap-2">
					<img src="/icons/super-challenge-trophy.svg" class="object-cover" alt="trophy" />
					<h2 class="font-bold">Super-Challenge Pokal</h2>
					<p class="text-center">
						Indem du alle 7 Super-Challenges erledigst, hast du deinen Co2-Ausstoß um die Hälfte
						reduziert!
					</p>
				</div>
				<button class="flex gap-2 justify-end w-full" on:click={shareTrophy}
					>Teilen
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.0911 0V6.249C9.74634 6.24917 0 6.31144 0 24C1.105 12.1714 6.18122 12.097 15.0911 12.0969V18.9212L24 9.45984L15.0911 0Z"
							fill="#1997C5"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/if}
{/await}

<style lang="scss">
	.super-challenge-trophy-card {
		border-radius: 0.25rem 0.25rem 0.25rem 4rem;
	}
</style>
