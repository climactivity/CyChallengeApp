<script context="module" lang="ts">
	export async function load({ params, fetch, session, stuff }) {
		return {
			status: 200,
			props: {
				currentPage: params.slug
			}
		};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onboarding } from '$lib/stores/onboarding-store';
	import Fa from 'svelte-fa';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

	const onboaringComplete = async () => {
		onboarding.set({
			hasOnboarded: true,
			skipped: false
		});

		goto('/sector');
	};

	const next = () => {
		if (Number(currentPage) >= 3) {
			onboaringComplete();
		} else {
			goto(`/welcome/showcase/${Number(currentPage) + 1}`);
		}
	};
	const prev = () => {
		if (Number(currentPage) <= 1) {
			return;
		} else {
			goto(`/welcome/showcase/${Number(currentPage) - 1}`);
		}
	};
	export let currentPage;
</script>

<div class="grid grid-flow-row absolute inset-0 bg-storm-darkest">
	<div>
		<slot />
	</div>
	<div
		class="grid  items-center gap-4 mx-auto w-full"
		style="grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 8rem;"
	>
		<div class="row-start-2 flex justify-center text-xs">
			<button class=" button" disabled={currentPage === 1} on:click={(_) => prev()}
				><Fa icon={faChevronLeft} /></button
			>
		</div>
		<div class="row-start-2 flex flex-row content-center items-center gap-4 mx-auto ">
			<div class:active={currentPage === '1'} class="h-2 w-2 bg-slate-400  rounded-full" />
			<div class:active={currentPage === '2'} class="h-2 w-2 bg-slate-400  rounded-full" />
			<div class:active={currentPage === '3'} class="h-2 w-2 bg-slate-400  rounded-full" />
		</div>
		<div class="row-start-2 flex justify-center">
			<button class="row-start-2 button text-xs" on:click={(_) => next()}
				>{#if currentPage == 3} Los geht's {:else} <Fa icon={faChevronRight} /> {/if}</button
			>
		</div>
	</div>
</div>

<style lang="scss">
	.active {
		@apply bg-white;
	}

	.button {
		@apply rounded-full bg-heart text-white ring-2 ring-white px-4 py-2 mx-4;
	}
</style>
