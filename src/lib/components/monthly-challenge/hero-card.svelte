<script>
	import { goto } from '$app/navigation';
	import { tutorialStore } from '$lib/stores/onboarding-store';
	import MonthyChallengeCard from '$lib/components/monthly-challenge/monthy-challenge-card.svelte';
	import TutorialCard from '$lib/components/monthly-challenge/tutorial-card.svelte';

	let currentMonthlyChallengeRequest = fetch(
		import.meta.env.VITE_PB_BASE_URL + '/current-monthly-challenge'
	).then(async (data) => await data.json());
</script>

{#await currentMonthlyChallengeRequest}
	<div
		class="relative overflow-hidden rounded-xl max-w-[24rem] min-h-[7.5rem] mx-auto  transition  grid animate-pulse bg-slate-200"
	/>
{:then currentMonthlyChallenge}
	{#if $tutorialStore}
		<MonthyChallengeCard {currentMonthlyChallenge} />
	{:else}
		<div
			class="px-8"
			on:click={(e) => {
				goto('/challenges/intro');
			}}
		>
			<TutorialCard />
		</div>
	{/if}
{/await}

<!-- <div
	class="h-36"
	on:click={(e) => {
		goto('/challenges/intro');
	}}
>
</div> -->
<style lang="scss">
	.left {
		background-image: url(/checklist.png);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	.right {
		@apply p-4;
		:nth-child(1) {
			@apply text-xl text-storm-dark;
		}
		:nth-child(2) {
			@apply text-2xl text-water2;
		}
		:nth-child(3) {
			@apply text-6xl text-nature;
			line-height: 0.5em !important;
		}
	}
</style>
