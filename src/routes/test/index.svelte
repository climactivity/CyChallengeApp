<script>
	import JournalButton from '$lib/components/buttons/journal-button.svelte';
</script>

<div class="min-h-screen grid place-content-center">
	<div class="grab-attention">
		<JournalButton path="#" />
	</div>
</div>

<style lang="scss">
	.grab-attention {
		--highlight-color: #e8b50d;
		animation-name: grab-attention;
		animation-duration: 1.35s;
		animation-fill-mode: forwards;
		animation-timing-function: ease-in-out;
	}

	@keyframes grab-attention {
		0%,
		100% {
			transform: rotateZ(0deg);
			color: inherit;
		}

		15%,
		85% {
			transform: rotateZ(0deg);
			color: var(--highlight-color, yellow);
		}
		33% {
			transform: rotateZ(10deg);
			color: var(--highlight-color, yellow);
		}

		66% {
			transform: rotateZ(-10deg);
			color: var(--highlight-color, yellow);
		}
	}
</style>
