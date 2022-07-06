<script lang="ts" context="module">
	import { acceptedChallenges } from '$testData/accepted-challenges';
	export async function load({ params, fetch, session, stuff }) {
		return {
			status: 200,
			props: {
				data: acceptedChallenges
			}
		};
	}
</script>

<script lang="ts">
	import JournalChallengeCard from '$lib/components/JournalChallengeCard.svelte';
	import type { AcceptedChallenge } from '$lib/types/challenges';
	import { fly, slide } from 'svelte/transition';

	let insets: Writable<any> = getContext('insets');

	import { headerState } from '$lib/stores/header-store';
	import HeaderBar from '$lib/components/header-bar.svelte';
	import type { Writable } from 'svelte/store';
	import { getContext, onMount } from 'svelte';

	headerState.set({
		backbutton: false,
		title: 'Journal',
		hidden: false
	});

	export let data: AcceptedChallenge[];
</script>

<div class="relative " style="margin-top: {$insets.top}px; --offset: 200px;">
	<div class="absolute top-0 left-0 right-0 z-30">
		<HeaderBar />
	</div>
	<div
		class=" pt-16 py-4 overflow-x-hidden h-screen pb-16 relative top-0 left-0 right-0  bg-sector-food bg-sector  z-20 "
	>
		<div class="grid grid-flow-row gap-4 overflow-y-auto">
			{#each data as acceptedChallenge}
				<JournalChallengeCard {acceptedChallenge} />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
</style>
