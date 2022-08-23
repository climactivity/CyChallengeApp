<script lang="ts" context="module">
	import { availableChallenges, challenges } from '$testData/challenges';

	export async function load({ params, fetch, session, stuff }) {
		let challenge = availableChallenges.find((challenge) => challenge.slug === params.slug);
		return {
			status: 200,
			props: {
				challenge
			}
		};
	}
</script>

<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import ActionHeroSection from '$lib/components/challenge/action-hero-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import BackToChallengesPageSection from '$lib/components/challenge/back-to-challenges-page-section.svelte';
	import RecommendedChallengesSection from '$lib/components/challenge/recommended-challenges-section.svelte';
	import DatePickerSection from '$lib/components/challenge/date-picker-section.svelte';
	import LottieAnim from '$lib/animations/lottie-anim.svelte';
	export let challenge: ChallengeV2;

	let anim;

	let playAnim;
	const dateChanged = (date) => {
		if (anim && date) playAnim();
	};
</script>

<div class="flex flex-col pt-8">
	<ActionHeroSection {challenge} index={0}>
		<div slot="title">
			{challenge.title}
		</div>
		<div slot="description">Notifications</div>
		<div slot="icon">
			<LottieAnim
				assetPath="/lottie/notifications.json"
				animOptions={{ autoplay: false, loop: false, pauseAfter: 0 }}
				bind:this={anim}
				bind:play={playAnim}
			/>
		</div>
	</ActionHeroSection>
	<DatePickerSection {challenge} index={1} onchanged={dateChanged} />
	<RecommendedChallengesSection {challenge} index={2} />
	<BackToChallengesPageSection last={true} index={3} />
</div>
