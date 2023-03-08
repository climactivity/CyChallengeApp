<script lang="ts">
	import IconButton from './icon-button.svelte';
	export let path: string = '#';
	export let onClick: Function;
	export let rejected: boolean = false;
</script>

<IconButton bind:path label={rejected ? 'viellecht doch?' : 'Nichts für mich'} {onClick} showLabel>
	{#if rejected}
		<!-- <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.5 17H30.5V23H10.5V17Z" fill="#ff00ff" />
			<path
				d="M20.5 0C9.472 0 0.5 8.972 0.5 20C0.5 31.028 9.472 40 20.5 40C31.528 40 40.5 31.028 40.5 20C40.5 8.972 31.528 0 20.5 0ZM20.5 36C11.678 36 4.5 28.822 4.5 20C4.5 11.178 11.678 4 20.5 4C29.322 4 36.5 11.178 36.5 20C36.5 28.822 29.322 36 20.5 36Z"
				fill="#ff00ff"
			/>
		</svg> -->

		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			width="41"
			height="40"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
			/>

			<!-- <path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
			/> -->
		</svg>
	{:else}
		<!-- <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.5 17H30.5V23H10.5V17Z" fill="currentColor" />
			<path
				d="M20.5 0C9.472 0 0.5 8.972 0.5 20C0.5 31.028 9.472 40 20.5 40C31.528 40 40.5 31.028 40.5 20C40.5 8.972 31.528 0 20.5 0ZM20.5 36C11.678 36 4.5 28.822 4.5 20C4.5 11.178 11.678 4 20.5 4C29.322 4 36.5 11.178 36.5 20C36.5 28.822 29.322 36 20.5 36Z"
				fill="currentColor"
			/>
		</svg> -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			width="41"
			height="40"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
			/>
		</svg>
	{/if}
</IconButton>
