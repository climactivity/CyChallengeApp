<script lang="ts">
	import RewardDisplay2 from './RewardDisplay2.svelte';

	import {
		getSuperChallengeCssClassForInteracion,
		getSuperChallengeDataForLeadChallenge
	} from '$lib/components/impact/super-challenge';
	import SuperChallengeIcon from '$lib/components/impact/super-challenge-icon.svelte';
	import {
		currentLevelForChallenge,
		getLastCompletion,
		getTopicBigointChallengeState,
		type ChallengeAccept,
		type ChallengeBookmark,
		type ChallengeComplete,
		type ChallengeReject
	} from '$lib/services/challenge-storage';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import MedalIcon from './medal-icon.svelte';
	import ChallengeHelpActionSheet from './challenge-help-action-sheet.svelte';

	export let challenge: ChallengeV2;
	export let challengeState:
		| ChallengeBookmark
		| ChallengeAccept
		| ChallengeReject
		| ChallengeComplete;

	let selectedDifficulty;
	let selectedDifficultyName;

	let numCompletions, medals;
	$: {
		numCompletions = challengeState?.completions?.length ?? 0;
		medals = challenge.type === 'recurring' ? Math.floor(numCompletions / 6) : numCompletions;

		if (challengeState) {
			selectedDifficultyName = challengeState.lastDifficulty;
			selectedDifficulty =
				challenge.difficulties[currentLevelForChallenge(challenge, challengeState)];
			console.log(challengeState, selectedDifficulty);
		}
	}

	let openDialog;
</script>

<div
	class="grid grid-flow-col mx-4 my-4 items-start relative"
	style="grid-template-columns: repeat(4, 1fr);"
	on:click={() => {
		openDialog();
	}}
>
	<div
		class="absolute -top-2 right-0 ring-1 rounded-full w-4 h-4 text-center grid place-content-center font-['loved-by-the-king']"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
			/>
		</svg>
	</div>

	<div class="flex flex-col justify-center items-center ">
		{#if challenge.lead}
			<div
				class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-content-center ring-1 ring-green-600"
			>
				{#await getSuperChallengeDataForLeadChallenge(challenge.slug) then superChallenge}
					<SuperChallengeIcon
						{superChallenge}
						showBorder={false}
						size={60}
						cssClass={getSuperChallengeCssClassForInteracion(challengeState)}
					/>
				{/await}
			</div>
		{:else}
			<div
				class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-content-center ring-1 ring-storm text-storm"
			>
				{#await getSuperChallengeDataForLeadChallenge(challenge.slug) then superChallenge}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-10 h-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
						/>
					</svg>
				{/await}
			</div>
		{/if}
		<span class="text-sm font-sans text-center"
			>{challenge.lead ? 'Super Challenge' : 'Challenge'}</span
		>
	</div>
	<div class="flex flex-col justify-center items-center">
		{#if challengeState && (challengeState.type === 'complete' || (challengeState.type === 'accept' && challengeState.completions?.length > 0))}
			<div
				class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-content-center ring-1 ring-green-600"
			>
				<div class="text-green-600 w-full ">
					<MedalIcon />
				</div>
			</div>
			<span class="text-sm font-sans text-center">Geschafft</span>
		{:else}
			<div
				class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-content-center ring-1 ring-storm"
			>
				<div class="text-storm-dark w-full ">
					<MedalIcon />
				</div>
			</div>
			<span class="text-sm font-sans text-center">.</span>
		{/if}
	</div>
	<div class="flex flex-col justify-center items-center">
		{#if challenge.type === 'one-time'}
			<div
				class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-content-center ring-1 ring-storm"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-12 h-12"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
					/>
				</svg>
			</div>
			<span class="text-sm font-sans text-center"> einmal </span>
		{:else if challenge.type === 'recurring'}
			<div
				class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-content-center ring-1 ring-storm"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-12 h-12"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
					/>
				</svg>
			</div>
			<span class="text-sm font-sans text-center"> wöchentlich </span>
		{:else if challenge.type === 'repeatable'}
			<div
				class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-content-center ring-1 ring-storm"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-12 h-12"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
					/>
				</svg>
			</div>
			<span class="text-sm font-sans text-center"> wiederholbar </span>
		{/if}
	</div>
	<div class="flex flex-col justify-center items-center">
		<div
			class="w-16 h-16 rounded-full bg-gray-50 m-1 grid place-content-center ring-1 ring-storm text-bla"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="1 -1 8 11"
				stroke-width=".7"
				stroke="currentColor"
				class="w-12 h-12"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="currentColor"
					stroke="currentColor"
					d="M 1 8 l 0 -3 c 0 -1 0 -1 1 -1 c 1 0 1 0 1 1 l 0 3 c 0 1 0 1 -1 1 c -1 0 -1 0 -1 -1 Z"
				/>

				{#if selectedDifficultyName === 'medium' || selectedDifficultyName === 'mittel' || selectedDifficultyName === 'hard' || selectedDifficultyName === 'schwer'}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						fill="currentColor"
						stroke="currentColor"
						d="M 4 8 l 0 -5 c 0 -1 0 -1 1 -1 c 1 0 1 0 1 1 l 0 5 c 0 1 0 1 -1 1 c -1 0 -1 0 -1 -1 Z"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke="currentColor"
						d="M 4 8 l 0 -5 c 0 -1 0 -1 1 -1 c 1 0 1 0 1 1 l 0 5 c 0 1 0 1 -1 1 c -1 0 -1 0 -1 -1 Z"
					/>
				{/if}

				{#if selectedDifficultyName === 'hard' || selectedDifficultyName === 'schwer'}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						fill="currentColor"
						stroke="currentColor"
						d="M 7 8 l 0 -7 c 0 -1 0 -1 1 -1 c 1 0 1 0 1 1 l 0 7 c 0 1 0 1 -1 1 c -1 0 -1 0 -1 -1 Z"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke="currentColor"
						d="M 7 8 l 0 -7 c 0 -1 0 -1 1 -1 c 1 0 1 0 1 1 l 0 7 c 0 1 0 1 -1 1 c -1 0 -1 0 -1 -1 Z"
					/>
				{/if}
			</svg>
		</div>
		<span class="text-sm font-sans text-center">
			{selectedDifficultyName || Object.values(challenge.difficulties)[0].name}
		</span>
	</div>
</div>

<ChallengeHelpActionSheet bind:open={openDialog} />

<div>
	<!-- {#if challenge.lead}
		<div class="mx-4 my-4 display flex flex-row items-center gap-3">
			<div>
				{#await getSuperChallengeDataForLeadChallenge(challenge.slug) then superChallenge}
					<SuperChallengeIcon
						{superChallenge}
						cssClass={getSuperChallengeCssClassForInteracion(challengeState)}
					/>
				{/await}
			</div>
			<div class=" font-bold font-serif text-storm-dark ">Super-Challenge</div>
		</div>
	{/if} -->

	<!-- completions
	{#if challengeState && (challengeState.type === 'complete' || (challengeState.type === 'accept' && challengeState.completions?.length > 0))}
		<RewardDisplay2 {medals} lastCompleted={getLastCompletion(challengeState).toRelative()} />
	{/if} -->

	<!-- <div class="mx-4 my-4 display grid grid-flow-col content-between w-full gap-3">
		{#if challenge.type === 'one-time'}
			one-time
		{:else if challenge.type === 'recurring'}
			<div>recurring</div>
			<div>I</div>
		{:else if challenge.type === 'repeatable'}
			repeatable
		{/if}
	</div> -->
	<!-- 
	<div class="mx-4 my-4 display flex flex-row items-center gap-3">
		{currentLevelForChallenge(challenge, challengeState)}
	</div> -->
</div>
