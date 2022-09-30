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
		<h1>Weitererzählen!</h1>
	</div>
	<div class="h-80 w-72 mx-auto">
		<LottieAnim
			assetPath="/lottie/110955-rocket-launch-animation-space-exploration.json"
			animOptions={{ loop: 4, autoplay: true }}
		/>
	</div>
	<div>
		Bist du auf deinem Weg zur Klimaneutralität schon weiter fortgeschritten oder du kannst in
		deinem Leben an bestimmten Punkten einfach nicht mehr tun, um deinen Fußabdruck weiter zu
		reduzieren? Vielleicht ist es dann Zeit, dass du rausgehst und anderen von der Sache erzählst!
		Denn am Ende brauchen wir nicht ein paar wenige, die ganz viel getan haben, sondern ganz viele,
		die sich in die richtige Richtung bewegen 😉
	</div>
</div>
<div class="overflow-visible  h-56">
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
