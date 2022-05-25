<script lang="ts">
	import { headerState } from '$lib/stores/header-store';

	import type { SvelteComponent } from 'svelte';

	import type { Writable } from 'svelte/store';

	let backbutton = false;
	let title = 'Title';
	let action: SvelteComponent;
	let hidden: boolean;
	import { fly } from 'svelte/transition';

	let onGoBack = () => {
		history.back();
	};

	const back = (e: Event) => {
		console.log('went back');
		if (onGoBack !== undefined) {
			onGoBack();
		} else {
			history.back();
		}
	};

	headerState.subscribe((state) => {
		backbutton = state.backbutton;
		title = state.title;
		action = state.action;
		hidden = state.hidden;
		onGoBack = state.back;
	});
</script>

{#if !hidden}
	<!-- <div class="relative transition-all {hidden ? 'h-0' : 'h-16'}"> -->
	<div transition:fly={{ y: -20, duration: 500 }} class="header pb-4 pt-4 px-6  bg-white shadow-md">
		<div>
			{#if backbutton}
				<div
					class="absolute flex flex-row content-center items-center gap-4"
					transition:fly={{ x: -20, duration: 500 }}
				>
					<button on:click={back}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 -2 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<h1 class="text-2xl transition-transform">{title}</h1>
				</div>
			{:else}
				<h1
					class=" absolute text-2xl transition-transform"
					transition:fly={{ x: 20, duration: 500 }}
				>
					{title}
				</h1>
			{/if}
		</div>
		{#if action}
			<div class="w-12 h-12 flex items-center">
				<svelte:component this={action} />
			</div>
		{/if}
	</div>
	<!-- </div> -->
{/if}

<style lang="scss">
	.header {
		display: grid;
		grid-template-columns: 1fr 3rem;
		@apply fixed top-0 left-0 right-0 h-16;
	}
</style>
