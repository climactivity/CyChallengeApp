<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ShareAppButton from '$lib/components/buttons/share-app-button.svelte';
	import HeroCompletedChallenges from '$lib/components/impact/hero-completed-challenges.svelte';
	import { isAllSuperChallengesCompelted } from '$lib/components/impact/super-challenge';
	import SuperChallengeMedals from '$lib/components/impact/super-challenge-medals.svelte';
</script>

<!-- Super Challenge Pokal-->
{#await isAllSuperChallengesCompelted() then isCompleted}
	{#if isCompleted}
		<div class="super-challenge-trophy-card">
			<div class="grid items-center gap-2 grid-flow-row">
				<div class="flex items-center place-content-center flex-col">
					<img src="/icons/super-challenge-trophy.svg" class="object-cover" alt="trophy" />
					<h2>Super-Challenge Pokal</h2>
					<p class="text-center">
						Indem du alle 7 Super-Challenges erledigst, hast du deinen Co2-Ausstoß um die Hälfte
						reduziert!
					</p>
				</div>
				<button class="flex gap-2 justify-end w-full"
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

<!-- abgeschlossene Challenges -->
<div class="transparent-card" on:click={() => goto('/journal/achievements')}>
	<HeroCompletedChallenges />
</div>

<!-- Super Challenge Abzeichen-->
<div class="transparent-card">
	<SuperChallengeMedals />
</div>

<!-- Explanation -->
<div class="mx-4 grid gap-4 pb-8">
	<p>
		Mit <em>abgeschlossene Challenges</em> siehst du wie viele Aktionen du für die Umwelt unternommen
		hast. Jede Challenge, die du annimmst, macht einen Unterschied!
	</p>
	<p>
		Mit den <em>Super-Challenges</em> kannst du deine Co2-Emissionen schnell reduzieren. Wenn du alle
		Super Challenges schaffst, reduzierst du deine Co2-Emissionen um die Hälfte im Vergleich zu einer
		*durch-schnittlichen Person!
	</p>
	<p class="footnote">*Durchschnittlicher Co2 pro Person in Deutschland: 9,44 Tonnen im Jahr</p>
</div>

<ShareAppButton context={$page.url.href} />

<style lang="scss">
	p > em {
		@apply font-bold not-italic;
	}

	.footnote {
		@apply text-right text-sm font-semibold;
	}

	.transparent-card {
		@apply m-4 p-4 border border-black border-opacity-10 rounded-lg;
	}

	.super-challenge-trophy-card {
		border-radius: 0.25rem 0.25rem 0.25rem 4rem;
		@apply m-4 p-4 border-2 border-black border-opacity-20 bg-white bg-opacity-80 shadow-md;
	}
</style>
