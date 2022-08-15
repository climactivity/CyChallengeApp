<script>
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';
	import { blur } from 'svelte/transition';

	import LottieAnim from '$lib/animations/lottie-anim.svelte';
</script>

<div
	class="grid grid-flow-row bg-white p-4 m-4 rounded-lg"
	in:blur={{ duration: ANIMATION_BASE_SPEED, delay: ANIMATION_BASE_SPEED }}
	out:blur={{ duration: ANIMATION_BASE_SPEED }}
>
	<div class="text-xl text-center font-serif font-bold pb-4">
		<h1>Warum Challenges</h1>
	</div>
	<div>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt sequi, atque adipisci aliquid
		amet ex nostrum corrupti, praesentium distinctio libero, maiores beatae obcaecati consectetur
		similique nemo nesciunt fuga temporibus velit.
	</div>
	<div class="h-80 w-72 mx-auto">
		<LottieAnim assetPath="/lottie/104853-thinking.json" />
	</div>
</div>
