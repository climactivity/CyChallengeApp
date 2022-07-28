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
	import DifficultyCard from '../../lib/components/difficulty-card.svelte';

	import { browser } from '$app/env';
	import ShareButton from '$lib/components/buttons/share-button.svelte';
	import { fly } from 'svelte/transition';

	import type { AcceptedChallenge, ChallengeV2, CompletedStep } from '$lib/types/challenges';

	export let data: ChallengeV2;
	import { headerState } from '$lib/stores/header-store';
	import Fa from 'svelte-fa';
	import { faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import ButtonSecondaryCta from '$lib/components/buttons/button-secondary-cta.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { detectLinks } from '$lib/util';
	import Confetti from '$lib/components/particles/confetti.svelte';
	import AcceptButton from '$lib/components/buttons/accept-button.svelte';
	import BookmarkButton from '$lib/components/buttons/bookmark-button.svelte';
	import AlreadyDoingItButton from '$lib/components/buttons/already-doing-it-button.svelte';
	import RejectButton from '$lib/components/buttons/reject-button.svelte';

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

	let playAt;
</script>

<div class="pt-16 ">
	<Confetti id="challenge_accept_particles" bind:playAt />

	<!-- header image-->
	<div
		class=" h-64 bg-red-500 w-full ch-card "
		style="background: url('https://via.placeholder.com/600x400'); background-size: cover;"
	/>
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
			<AcceptButton onClick={(e) => console.log('accept challenge')} />
			<!-- save button -->
			<BookmarkButton onClick={(e) => console.log('bookmark challenge')} />

			<!-- already doing it button -->
			<AlreadyDoingItButton onClick={(e) => console.log('already doing challenge')} />

			<!-- reject challenge button -->
			<RejectButton onClick={(e) => console.log('reject challenge')} />
		</div>

		<!-- steps -->
		<div class="">
			<DifficultyCard
				difficulty={data.difficulties['easy']}
				name="Todos"
				onSelected={() => {}}
				selected
			/>
		</div>
		<!-- more infos -->

		<div class=" rounded-xl p-2 bg-white">
			<p class="text-center font-bold text-xl pb-2">Mehr</p>
			<p class="align-middle text-lg pb-2">
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
