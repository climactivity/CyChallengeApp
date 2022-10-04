<script>
	import { goto } from '$app/navigation';
	import HeroCompletedChallenges from '$lib/components/impact/hero-completed-challenges.svelte';
	import SuperChallengeMedals from '$lib/components/impact/super-challenge-medals.svelte';
</script>

<!-- abgeschlossene Challenges -->
<div class="transparent-card" on:click={() => goto('/journal/achievements')}>
	<HeroCompletedChallenges />
</div>

<!-- Super Challenge Abzeichen-->
<div class="transparent-card">
	<SuperChallengeMedals />
</div>

<!-- Explanation -->
<div class="mx-4 grid gap-4">
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
</style>
