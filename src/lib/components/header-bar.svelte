<script lang="ts">
	import { headerState } from '$lib/stores/header-store';

	import type { SvelteComponent } from 'svelte';

	import { flip } from 'svelte/animate';
	let backbutton = false;
	let title = 'Title';
	let action: SvelteComponent;
	let hidden: boolean;
	let transparent: boolean;
	import { fly, slide } from 'svelte/transition';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const [send, receive] = crossfade({
		duration: (d) => d,

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

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
		transparent = state.transparent ?? false;
	});
</script>

{#if !hidden}
	<!-- <div class="relative transition-all {hidden ? 'h-0' : 'h-16'}"> -->
	<div
		class="header pb-4 pt-4 px-6 transition-all  {transparent
			? 'bg-opacity-0'
			: 'bg-slate-100 shadow-md'} "
	>
		<div>
			{#if backbutton}
				<div class="absolute flex flex-row content-center items-center gap-4">
					<button on:click={back} transition:fly={{ x: -200, duration: 200 }} aria-label="back">
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

					<h1
						class="font-semibold text-xl font-serif transition-transform"
						out:send={{ key: 'title' }}
						in:receive={{ key: 'title' }}
					>
						{title}
					</h1>
				</div>
			{/if}

			{#if !backbutton}
				<h1
					class=" absolute font-semibold text-xl font-serif transition-transform {transparent
						? 'hidden'
						: ''}"
					out:send={{ key: 'title' }}
					in:receive={{ key: 'title' }}
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
		@apply top-0 left-0 right-0 h-16;
	}
</style>
