<script lang="ts">
	import { goto } from '$app/navigation';
	import { getChallengeUserData } from '$lib/services/challenge-storage';
	import type { SuperChallenge } from '$lib/types/challenges';
	import type { StorageObject } from '@heroiclabs/nakama-js';
	import { fade } from 'svelte/transition';
	import { calcEasing } from 'tsparticles-engine';

	export let superChallenge: SuperChallenge;
	export let index: 0;
	let challengeState = getChallengeUserData(superChallenge.slug);

	const getClassForInteracion = (object: StorageObject) => {
		console.log('getClassForInteracion', object);

		if (!object) {
			return 'not-accepted';
		} else {
			let { value } = object;

			console.log('fetched interaction', value);
		}
	};
</script>

<div
	in:fade
	class="grid grid-flow-col place-items-center"
	style="grid-template-columns: 5rem 1fr;"
	on:click={() => goto(`/challenge/${superChallenge.slug}`)}
>
	<div class="w-12 h-12  rounded-full grid place-items-center">
		{#await challengeState}
			<img
				class="animate-pulse"
				src={superChallenge.icon}
				alt={`${superChallenge.label} icon`}
				aria-hidden
			/>
		{:then challengeInteraction}
			<img
				src={superChallenge.icon}
				alt={`${superChallenge.label} icon`}
				aria-hidden
				class="{getClassForInteracion(challengeInteraction)} animate-fadeInDown opacity-0"
				style="animation-delay: calc({index} * 300ms + 500ms);"
			/>
		{/await}
	</div>
	<div class="place-self-center w-full">
		<span class="w-full font-bold"> {superChallenge.label} </span>
	</div>
</div>

<style lang="scss">
	.not-accepted {
		@apply text-gray-300;
	}
</style>
