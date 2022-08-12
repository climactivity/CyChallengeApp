<script>
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { ANIMATION_BASE_SPEED } from '$lib/animations/page-transition-anim';

	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
</script>

<div class="grid grid-flow-row" out:slide={{ duration: ANIMATION_BASE_SPEED }}>
	<div>Step 3</div>
	<div>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt sequi, atque adipisci aliquid
		amet ex nostrum corrupti, praesentium distinctio libero, maiores beatae obcaecati consectetur
		similique nemo nesciunt fuga temporibus velit.
	</div>
	<ButtonPrimaryCta
		onClick={() => {
			goto('/challenges');
		}}
	>
		Jetzt eine Challenge finden!
	</ButtonPrimaryCta>
</div>
