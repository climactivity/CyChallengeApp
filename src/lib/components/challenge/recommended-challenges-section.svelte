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
	import type { ChallengeV2 } from '$lib/types/challenges';
	import { availableChallenges, availableTopics } from '$testData/challenges';
	import ChallengesButton from '../buttons/challenges-button.svelte';
	import ChallengeScroller from './ChallengeScroller.svelte';
	export let challenge: ChallengeV2;
	export let rejected: boolean = false;

	export let data = availableChallenges;

	export let topics = availableTopics;
	export let tags = {};
</script>

<VSection {...$$props} pad={false}>
	<!-- <div class="font-serif font-semibold text-xl">
		{rejected
			? 'Andere Challenges, die dich statt dessen interessieren könnten'
			: 'Andere Challenges, die dich auch interessieren könnten'}
	</div> -->

	<ChallengeScroller
		challenges={data.filter((ch) => ch.slug !== challenge.slug)}
		title={rejected
			? 'Andere Challenges, die dich statt dessen interessieren könnten:'
			: 'Andere Challenges, die dich auch interessieren könnten:'}
		tags={topics}
		challengeHidden={(_) => false}
		pad={true}
	/>
</VSection>
