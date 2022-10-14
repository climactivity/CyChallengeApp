<script>
	import JournalButton from '$lib/components/buttons/journal-button.svelte';
	import TutorialCard from '$lib/components/challenge/tutorial-card.svelte';
</script>

<div class="min-h-screen grid place-content-center">
	<div class="absolute inset-12">
		<TutorialCard />
	</div>
</div>

<style lang="scss">
	.text-obnoxious {
		@apply font-bold font-serif;
		--text-shadow-inner: #fff;
		--text-shadow-outer: #000;
		--shadow-spread: 0.8px;
		text-shadow: -1px -1px 0px var(--text-shadow-inner), -1px 1px 0px var(--text-shadow-inner),
			1px -1px 0px var(--text-shadow-inner), 1px 1px 0px var(--text-shadow-inner),
			-1px -1px var(--shadow-spread) var(--text-shadow-outer),
			-1px 1px var(--shadow-spread) var(--text-shadow-outer),
			1px -1px var(--shadow-spread) var(--text-shadow-outer),
			1px 1px var(--shadow-spread) var(--text-shadow-outer);
	}

	.bg-tutorial-card {
		background: linear-gradient(0deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)),
			linear-gradient(230deg, #0077b5 10%, #95c11f 93%);
		/* figma export broken, time to abuse box shadow*/
		box-shadow: inset 0px 0px 1rem 0.25rem rgba(0 0 0 / 0.1),
			inset 0px 0px 0px 0.25rem rgba(0 0 0 / 0.1);

		border-radius: 1rem;
	}
</style>
