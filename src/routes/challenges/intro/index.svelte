<script>
	import { goto } from '$app/navigation';
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import { slide, fly, blur } from 'svelte/transition';
	import { customFlyOut } from '$lib/animations/better-animation';
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';
	import LottieAnim from '$lib/animations/lottie-anim.svelte';
	import { TorusGeometry } from 'three';
</script>

<div
	class="grid grid-flow-row bg-white p-4 m-4 rounded-lg"
	in:blur={{ duration: ANIMATION_BASE_SPEED, delay: ANIMATION_BASE_SPEED }}
	out:blur={{ duration: ANIMATION_BASE_SPEED }}
>
	<div class="text-xl text-center font-serif font-bold pb-4">
		<h1>Was sind Bigpoints</h1>
	</div>
	<div class="h-80 w-72 mx-auto">
		<LottieAnim
			assetPath="/lottie/112117-404-page.json"
			animOptions={{ loop: true, autoplay: true, pauseAfter: 1800 }}
		/>
	</div>
	<div>
		Big Points sind die Bereiche in unserem Leben, in denen es einen richtig großen Unterschied
		macht, ob wir uns klimafreundlich verhalten. Hier können wir einige hundert kg oder sogar
		mehrere Tonnen CO2 einsparen.
	</div>
</div>
