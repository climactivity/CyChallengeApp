<script lang="ts">
	export let backbutton = false;
	export let title = 'Title';

	export let onGoBack = () => {
		history.back();
	};

	const back = (e: Event) => {
		console.log('went back');
		onGoBack();
	};
</script>

<div class="header pb-4 pt-8 px-6  bg-white backdrop-blur-md">
	<div class="flex flex-row content-center items-center gap-4">
		{#if backbutton}
			<button on:click={back}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
		{/if}
		<h1 class="text-2xl ">{title}</h1>
	</div>
	<div class="w-12 h-12 flex items-center">
		<slot name="action" />
	</div>
</div>

<style lang="scss">
	.header {
		display: grid;
		grid-template-columns: 1fr 3rem;
	}
</style>
