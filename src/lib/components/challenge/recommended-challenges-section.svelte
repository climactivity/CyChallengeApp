<!-- <script lang="ts" context="module">
	import {
		availableChallenges,
		availableChallengesByTopic,
		availableTags,
		availableTopics
	} from '$testData/challenges';
	export async function load({ params, fetch, session, stuff }) {
		console.log('load', params);
		return {
			status: 200,
			props: {
				data: availableChallenges,
				tags: availableTags,
				tagList: Object.keys(availableTags),
				topics: availableTopics,
				topicList: Object.keys(availableTopics)
			}
		};
	}
</script> -->
<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import { getChallengesByTopic } from '$lib/services/challenge-content';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { availableChallenges, availableTopics } from '$testData/challenges';
	import ChallengesButton from '../buttons/challenges-button.svelte';
	import ChallengeScroller from './ChallengeScroller.svelte';
	export let challenge: ChallengeV2;
	export let rejected: boolean = false;

	console.log(challenge);

	export let data = getChallengesByTopic(challenge.topic);
	// export let topics;
</script>

<VSection {...$$props} pad={false}>
	<!-- <div class="font-serif font-semibold text-xl">
		{rejected
			? 'Andere Challenges, die dich statt dessen interessieren könnten'
			: 'Andere Challenges, die dich auch interessieren könnten'}
	</div> -->

	{#await data then challenges}
		<ChallengeScroller
			challenges={challenges.filter((ch) => ch.slug !== challenge.slug)}
			title={rejected
				? 'Andere Challenges, die dich statt dessen interessieren könnten:'
				: 'Andere Challenges, die dich auch interessieren könnten:'}
			tags={{}}
			challengeHidden={(_) => false}
			pad={true}
		/>
	{:catch e}
		meep
	{/await}
</VSection>
