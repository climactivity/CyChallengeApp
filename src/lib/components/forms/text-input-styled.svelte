<script lang="ts">
	import { slide } from 'svelte/transition';

	export let label;
	export let id;
	export let placeholder;
	export let binds;
	export let errors;
</script>

<div>
	<label for={id} class="block text-sm font-medium"> {label} </label>
	<input class="text-input" type="text" {id} {placeholder} bind:value={binds[id]} />
	{#if errors && errors[id]}
		<div class="text-red-500 block text-xs font-medium" transition:slide>
			{errors[id]}
		</div>
	{/if}
</div>

<style lang="scss">
	.text-input {
		@apply w-full
               border
               border-gray-300
               rounded-lg
               shadow-sm;
	}

	.text-input:focus {
		@apply outline-none border-water2-light ring-1 ring-water2-light;
	}
</style>
