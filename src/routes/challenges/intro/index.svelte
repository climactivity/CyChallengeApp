<script>
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';
</script>

<div class="grid grid-flow-row bg-white" out:slide={{ duration: ANIMATION_BASE_SPEED }}>
	<div>Step 1</div>
	<div>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt sequi, atque adipisci aliquid
		amet ex nostrum corrupti, praesentium distinctio libero, maiores beatae obcaecati consectetur
		similique nemo nesciunt fuga temporibus velit.
	</div>
</div>
