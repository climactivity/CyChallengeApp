<script>
	import { goto } from '$app/navigation';
	import { slide, fly, blur } from 'svelte/transition';
	import { customFlyOut } from '$lib/animations/better-animation';
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';

	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';

	import { onMount, onDestroy, getContext } from 'svelte';
	import { browser } from '$app/env';
	import LottieAnim from '$lib/animations/lottie-anim.svelte';
	import ChallengeScroller from '$lib/components/challenge/ChallengeScroller.svelte';
	import { getChallengeBySlug } from '$lib/services/challenge-content';
	import ButtonSecondaryCta from '$lib/components/buttons/button-secondary-cta.svelte';
	import { tutorialStore } from '$lib/stores/onboarding-store';

	let recommendedChallengesReq = Promise.all([
		getChallengeBySlug('iss_mehr_pflanzen'),
		getChallengeBySlug('wechsel_zu_oekostrom'),
		getChallengeBySlug('wuensch_dir_was')
	]);

	const iOSSafari = getContext('iOSSafari');

	tutorialStore.set(true);
</script>

<div
	class="grid grid-flow-row bg-white p-4 m-4 rounded-lg"
	in:blur={{ duration: ANIMATION_BASE_SPEED, delay: ANIMATION_BASE_SPEED }}
	out:blur={{ duration: ANIMATION_BASE_SPEED }}
>
	<div class="text-xl text-center font-serif font-bold pb-4">
		<h1>Einfach loslegen</h1>
	</div>
	<div class="h-80 w-72 mx-auto">
		<LottieAnim assetPath="/lottie/110955-rocket-launch-animation-space-exploration.json" />
	</div>
	<div>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt sequi, atque adipisci aliquid
		amet ex nostrum corrupti, praesentium distinctio libero, maiores beatae obcaecati consectetur
		similique nemo nesciunt fuga temporibus velit.
	</div>
</div>
<div class="overflow-visible  h-40">
	{#await recommendedChallengesReq then recommendedChallenges}
		<ChallengeScroller
			challengeHidden={() => false}
			challenges={recommendedChallenges}
			title="Gute Startchallenges"
			pad
		/>
	{/await}
</div>
<div class=" p-4 ">
	<ButtonSecondaryCta
		onClick={() => {
			goto('/challenges');
		}}
	>
		Oder eine andere Challenge finden!
	</ButtonSecondaryCta>
</div>

{#if iOSSafari}
	<div class="h-60" />
{:else}
	<div class="h-40" />
{/if}
