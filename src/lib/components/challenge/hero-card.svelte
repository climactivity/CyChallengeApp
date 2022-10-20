<script>
	import { goto } from '$app/navigation';
	import { tutorialStore } from '$lib/stores/onboarding-store';
	import TutorialCard from './tutorial-card.svelte';
</script>

{#if $tutorialStore}
	<div>Todo: Display monthly challenge when tutorial is completed</div>
{:else}
	<div
		class="px-8"
		on:click={(e) => {
			goto('/challenges/intro');
		}}
	>
		<TutorialCard />
	</div>
{/if}

<!-- <div
	class="h-36"
	on:click={(e) => {
		goto('/challenges/intro');
	}}
>
</div> -->
<style lang="scss">
	.left {
		background-image: url(/checklist.png);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	.right {
		@apply p-4;
		:nth-child(1) {
			@apply text-xl text-storm-dark;
		}
		:nth-child(2) {
			@apply text-2xl text-water2;
		}
		:nth-child(3) {
			@apply text-6xl text-nature;
			line-height: 0.5em !important;
		}
	}
</style>
