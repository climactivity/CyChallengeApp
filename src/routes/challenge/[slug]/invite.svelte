<script lang="ts" context="module">
	import { availableChallenges } from '$testData/challenges';

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
	import ShareToSocialMediaSection from '$lib/components/challenge/share-to-social-media-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	export let challenge: ChallengeV2;
</script>

<div class="flex flex-col pt-8">
	<div class="mx-4 px-6 py-8 bg-white shadow rounded-lg sm:px-10  ">
		<form class="mb-0 space-y-6">
			<div>
				<label for="your_name" class="block text-sm font-medium mb-1"> Dein Name </label>
				<input
					class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-water2-light focus:ring focus:ring-water2-light"
					id="your_name"
					type="text"
				/>
			</div>

			<div>
				<label for="their_name" class="block text-sm font-medium"> Dein:e Freund:in </label>
				<input class="form-input" id="your_name" type="text" />
			</div>

			<div>
				<label for="their_email" class="block text-sm font-medium"> Email </label>
				<input class="form-input" id="your_name" type="text" />
			</div>
		</form>
	</div>
	<ShareToSocialMediaSection {challenge} index={0} last />
</div>
