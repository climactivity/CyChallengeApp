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
	export let challenge: ChallengeV2;
</script>

<div class="flex flex-col pt-8">
	<ActionHeroSection {challenge} index={0}>
		<div slot="title">
			{challenge.title}
		</div>
		<div slot="description">Notifications</div>
		<div slot="icon">
			<svg viewBox="0 0 33 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M16.5001 40C18.7565 40 20.6027 38.1538 20.6027 35.8974H12.3975C12.3975 38.1538 14.2437 40 16.5001 40ZM28.8078 27.6923V17.4359C28.8078 11.1385 25.4642 5.86667 19.577 4.47179V3.07692C19.577 1.37436 18.2027 0 16.5001 0C14.7975 0 13.4232 1.37436 13.4232 3.07692V4.47179C7.55651 5.86667 4.19241 11.1179 4.19241 17.4359V27.6923L0.0898438 31.7949V33.8462H32.9104V31.7949L28.8078 27.6923ZM24.7052 29.7436H8.29497V17.4359C8.29497 12.3487 11.3924 8.20513 16.5001 8.20513C21.6078 8.20513 24.7052 12.3487 24.7052 17.4359V29.7436Z"
					fill="currentColor"
				/>
			</svg>
		</div>
	</ActionHeroSection>
	<DatePickerSection {challenge} index={1} />
	<RecommendedChallengesSection {challenge} index={2} />
	<BackToChallengesPageSection last={true} index={3} />
</div>
