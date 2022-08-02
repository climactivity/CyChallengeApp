<script lang="ts" context="module">
	import { availableChallenges, challenges } from '$testData/challenges';

	export async function load({ params, fetch, session, stuff }) {
		let challenge = availableChallenges.find((challenge) => challenge.slug === params.slug);
		return {
			status: 200,
			props: {
				data: challenge
			}
		};
	}
</script>

<script lang="ts">
	import DifficultyCard from '$lib/components/difficulty-card.svelte';

	import { browser } from '$app/env';
	import ShareButton from '$lib/components/buttons/share-button.svelte';
	import { fade, fly } from 'svelte/transition';

	import type { AcceptedChallenge, ChallengeV2, CompletedStep } from '$lib/types/challenges';

	export let data: ChallengeV2;
	import { headerState } from '$lib/stores/header-store';
	import Fa from 'svelte-fa';
	import { faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import ButtonSecondaryCta from '$lib/components/buttons/button-secondary-cta.svelte';
	import { goto, prefetch } from '$app/navigation';
	import { page } from '$app/stores';
	import { detectLinks } from '$lib/util';
	import Confetti from '$lib/components/particles/confetti.svelte';
	import AcceptButton from '$lib/components/buttons/accept-button.svelte';
	import BookmarkButton from '$lib/components/buttons/bookmark-button.svelte';
	import AlreadyDoingItButton from '$lib/components/buttons/already-doing-it-button.svelte';
	import RejectButton from '$lib/components/buttons/reject-button.svelte';
	import { buttonAlerts } from '$lib/stores/button-alerts';

	let showMore = false;

	const back = () => {
		if (showMore) {
			showMore = false;
			goto($page.url.pathname, { replaceState: true });
		} else {
			history.back();
		}
	};
	headerState.set({
		backbutton: true,
		title: data.title,
		hidden: false,
		transparent: true,
		back
	});

	let selectedDifficulty: string;
	const selectDifficulty = (difficulty: string) => {
		if (selectedDifficulty === difficulty) {
			selectedDifficulty = undefined;
		} else {
			selectedDifficulty = difficulty;
		}
	};

	let addedPlus = false;
	const addPlus = (added: string) => {
		addedPlus = !!!addedPlus;
	};

	const action = async (nextRoute) => {
		const route = `/challenge/${data.slug}/${nextRoute}`;
		await prefetch(route);
		goto(route, { noscroll: true });
	};

	let playAt;
</script>

<div class="" transition:fade={{ duration: 250 }}>
	<!-- <Confetti id="challenge_accept_particles" bind:playAt /> -->

	<!-- header image-->
	<!-- <div
		class=" h-64 bg-red-500 w-full ch-card shadow-nature "
		style={`background: url( ${
			data.image?.file?.path
				? $page.url.origin + '/' + data.image?.file?.path
				: 'https://picsum.photos/1000'
		}); background-size: cover;`}
	/> -->
	<div class="p-4 m-4 space-y-8">
		<!-- title -->

		<div class="text-xl font-bold font-serif">
			{data.title}
		</div>

		<!-- front matter -->
		<p class="text-lg  prose">
			{data.frontMatter}
		</p>

		<!-- actions -->

		<div class="grid grid-flow-col actions " style="place-items: baseline;">
			<!-- accept button -->
			<AcceptButton
				onClick={async (e) => {
					console.log('accept challenge');
					action('accept');
				}}
			/>
			<!-- save button -->
			<BookmarkButton
				onClick={async (e) => {
					console.log('bookmark challenge');
					buttonAlerts.update((alerts) => [
						...alerts,
						{
							path: '/journal',
							type: 'attention'
						}
					]);
					action('bookmark');
				}}
			/>

			<!-- already doing it button -->
			<AlreadyDoingItButton
				onClick={(e) => {
					console.log('already doing challenge');
					action('way-ahead-of-you');
				}}
			/>

			<!-- reject challenge button -->
			<RejectButton
				onClick={(e) => {
					console.log('reject challenge');
					action('reject');
				}}
			/>
		</div>

		<!-- steps -->
		{#if data.difficulties['easy']}
			<div class="">
				<DifficultyCard
					difficulty={data.difficulties['easy']}
					name="Todos"
					onSelected={() => {}}
					selected
				/>
			</div>
		{:else if data.difficulties['medium']}
			<div class="">
				<DifficultyCard
					difficulty={data.difficulties['medium']}
					name="Todos"
					onSelected={() => {}}
					selected
				/>
			</div>
		{:else if data.difficulties['hard']}
			<div class="">
				<DifficultyCard
					difficulty={data.difficulties['hard']}
					name="Todos"
					onSelected={() => {}}
					selected
				/>
			</div>
		{/if}
		<!-- more infos -->

		<div class=" rounded-xl p-2 bg-white">
			<p class="text-center font-bold text-xl pb-2">Mehr</p>
			<p class="align-middle text-md pb-2">
				{data.content}
			</p>
		</div>

		<!-- related challenges -->
		<div>related challenges</div>
		<!-- share to social media -->
		<div>share thing</div>
	</div>
</div>

<style lang="scss">
	.actions > * {
		align-self: start;
		:hover,
		:focus {
			outline: none;
		}
	}
</style>
