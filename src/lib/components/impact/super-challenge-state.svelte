<script lang="ts">
	import SuperChallengeIcon from './super-challenge-icon.svelte';

	import { goto } from '$app/navigation';
	import {
		getChallengeUserData,
		type ChallengeAccept,
		type ChallengeInteraction
	} from '$lib/services/challenge-storage';
	import type { StorageObject } from '@heroiclabs/nakama-js';
	import { getSuperChallengeCssClassForInteracion, type SuperChallenge } from './super-challenge';

	export let superChallenge: SuperChallenge;
	export let index = 0;
	let challengeState = getChallengeUserData(superChallenge.slug);

	const getClassForInteracion = (object: StorageObject) => {
		if (!object) {
			return 'not-accepted';
		} else {
			let value: ChallengeInteraction = object.value as ChallengeInteraction;

			return getSuperChallengeCssClassForInteracion(value);
		}
	};
</script>

<div
	class="grid grid-flow-col place-items-center animate-fadeInDown opacity-0"
	style="grid-template-columns: 5rem 1fr; animation-delay: calc({index} * 75ms + 250ms);"
	on:click={() => goto(`/challenge/${superChallenge.slug}`)}
>
	<div class="w-12 h-12  rounded-full grid place-items-center">
		{#await challengeState}
			<svg
				aria-hidden
				style=""
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					x="1"
					y="1"
					width="38"
					height="38"
					rx="19"
					stroke="currentColor"
					stroke-opacity="0.16"
					stroke-width="2"
				/>
			</svg>
		{:then challengeInteraction}
			<SuperChallengeIcon {superChallenge} cssClass={getClassForInteracion(challengeInteraction)} />
		{/await}
	</div>
	<div class="place-self-center w-full">
		<span class="w-full font-bold"> {superChallenge.label} > </span>
	</div>
</div>
