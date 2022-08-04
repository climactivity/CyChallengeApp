<script lang="ts">
	import IconButton from './icon-button.svelte';
	export let path: string = '#';
	export let onClick: Function;
	export let rejected: boolean = false;
</script>

<IconButton bind:path label="Kann nicht mehr" {onClick} showLabel>
	{#if rejected}
		<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.5 17H30.5V23H10.5V17Z" fill="#ff00ff" />
			<path
				d="M20.5 0C9.472 0 0.5 8.972 0.5 20C0.5 31.028 9.472 40 20.5 40C31.528 40 40.5 31.028 40.5 20C40.5 8.972 31.528 0 20.5 0ZM20.5 36C11.678 36 4.5 28.822 4.5 20C4.5 11.178 11.678 4 20.5 4C29.322 4 36.5 11.178 36.5 20C36.5 28.822 29.322 36 20.5 36Z"
				fill="#ff00ff"
			/>
		</svg>
	{:else}
		<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.5 17H30.5V23H10.5V17Z" fill="currentColor" />
			<path
				d="M20.5 0C9.472 0 0.5 8.972 0.5 20C0.5 31.028 9.472 40 20.5 40C31.528 40 40.5 31.028 40.5 20C40.5 8.972 31.528 0 20.5 0ZM20.5 36C11.678 36 4.5 28.822 4.5 20C4.5 11.178 11.678 4 20.5 4C29.322 4 36.5 11.178 36.5 20C36.5 28.822 29.322 36 20.5 36Z"
				fill="currentColor"
			/>
		</svg>
	{/if}
</IconButton>
