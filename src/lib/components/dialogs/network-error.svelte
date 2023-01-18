<script lang="ts">
	import { hasError } from '$lib/client';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';

	let isOpen = false;
	let state: { error: string; description: string } = null;
	hasError.subscribe((errorValue) => {
		if (errorValue != null) {
			isOpen = true;
			state = errorValue;
		} else {
			isOpen = false;
			state = null;
		}
	});
</script>

<Dialog open={isOpen} on:close={close}>
	<DialogOverlay
		style={'position: absolute; inset: 0; background-color: rgb(0 0 0); opacity: 0.3; z-index: 51'}
	/>

	{#if state && state.error && state.description}
		<div
			class="absolute left-8 right-8 bottom-20 h-60 bg-white rounded-lg p-4 space-y-4 shadow-xl z-[52]"
		>
			<DialogTitle class="text-xl font-bold">
				<div class="flex flex-row place-content-between">
					<div>{state?.error}</div>
				</div>
			</DialogTitle>
			<DialogDescription>{state.description}</DialogDescription>
			<div class="text-center ">
				<div class="lds-ripple">
					<div />
					<div />
				</div>
			</div>
		</div>
	{/if}
</Dialog>

<style lang="scss">
	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid rgb(255, 0, 0);
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		4.9% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		5% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>
