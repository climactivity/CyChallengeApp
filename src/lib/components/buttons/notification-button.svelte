<script lang="ts">
	import IconButton from './icon-button.svelte';
	export let path: string = '#';
	export let onClick: Function;
</script>

<IconButton bind:path label="Benachrichtigungen" {onClick} showLabel>
	<svg width="33" height="40" viewBox="0 0 33 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M16.5001 40C18.7565 40 20.6027 38.1538 20.6027 35.8974H12.3975C12.3975 38.1538 14.2437 40 16.5001 40ZM28.8078 27.6923V17.4359C28.8078 11.1385 25.4642 5.86667 19.577 4.47179V3.07692C19.577 1.37436 18.2027 0 16.5001 0C14.7975 0 13.4232 1.37436 13.4232 3.07692V4.47179C7.55651 5.86667 4.19241 11.1179 4.19241 17.4359V27.6923L0.0898438 31.7949V33.8462H32.9104V31.7949L28.8078 27.6923ZM24.7052 29.7436H8.29497V17.4359C8.29497 12.3487 11.3924 8.20513 16.5001 8.20513C21.6078 8.20513 24.7052 12.3487 24.7052 17.4359V29.7436Z"
			fill="currentColor"
		/>
	</svg>
</IconButton>
