<script lang="ts">
	import { buttonAlerts } from '$lib/stores/button-alerts';

	import IconButton from './icon-button.svelte';
	export let path: string;
</script>

<IconButton bind:path label="Wirkung" showLabel>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="w-[1.875rem] h-[1.875rem]"
		fill="currentColor"
		viewBox="0 0 41 40"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			d="M2.5 33V29.25H30V19.25H2.5V14.25H20V4.25H2.5V0.5H0V33C0 33.663 0.263392 34.2989 0.732233 34.7678C1.20107 35.2366 1.83696 35.5 2.5 35.5H35V33H2.5ZM27.5 26.75H15V21.75H27.5V26.75ZM17.5 11.75H10V6.75H17.5V11.75Z"
		/>
	</svg>
</IconButton>
