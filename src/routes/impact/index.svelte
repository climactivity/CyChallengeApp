<script>
	import SuperChallengeTrophy from '$lib/components/impact/super-challenge-trophy.svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ShareAppButton from '$lib/components/buttons/share-app-button.svelte';
	import HeroCompletedChallenges from '$lib/components/impact/hero-completed-challenges.svelte';
	import { isAllSuperChallengesCompelted } from '$lib/components/impact/super-challenge';
	import SuperChallengeMedals from '$lib/components/impact/super-challenge-medals.svelte';
	import { fade, fly } from 'svelte/transition';
</script>

<!-- Super Challenge Pokal-->

<SuperChallengeTrophy />

<!-- abgeschlossene Challenges -->
<div
	class="transparent-card animate-fade opacity-0 "
	style="animation-delay: 350ms;"
	on:click={() => goto('/journal/achievements')}
>
	<HeroCompletedChallenges />
</div>

<!-- Super Challenge Abzeichen -->
<div class="transparent-card animate-fade opacity-0 " style="animation-delay: 550ms;">
	<SuperChallengeMedals />
</div>

<!-- Explanation -->
<div class="mx-4 grid gap-4 pb-8 animate-fade opacity-0" style="animation-delay: 1500ms;">
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
