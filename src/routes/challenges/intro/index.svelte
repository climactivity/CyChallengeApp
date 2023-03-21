<script>
	import LottieAnim from '$lib/animations/lottie-anim.svelte';
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';
	import { blur } from 'svelte/transition';
</script>

<div
	class="grid grid-flow-row bg-white p-4 m-4 rounded-lg"
	in:blur={{ duration: ANIMATION_BASE_SPEED, delay: ANIMATION_BASE_SPEED }}
	out:blur={{ duration: ANIMATION_BASE_SPEED }}
>
	<div class="text-xl text-center font-serif font-bold pb-4">
		<h1>Den Fußabdruck halbieren</h1>
	</div>
	<div class="h-80 w-72 mx-auto">
		<LottieAnim
			assetPath="/lottie/112117-404-page.json"
			animOptions={{ loop: true, autoplay: true, pauseAfter: 1800 }}
		/>
	</div>
	<div>
		Wenn wir in unserem Leben die Big Points des Klimaschutzes beherzigen, dann können wir leicht
		unseren Fußabdruck auf die Hälfte reduzieren. Die Climactivity-Challenge-App hilft dir dabei!
	</div>
</div>
