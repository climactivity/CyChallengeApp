<script lang="ts">
	import { goto } from '$app/navigation';
	import ButtonPrimaryCta from './button-primary-cta.svelte';

	export let context: string;

	const openShareTarget = () => {
		if (context) goto(`/info/invite-to-app?ref=${context}`);
		goto(`/info/invite-to-app`);
	};
</script>

<div class="m-4">
	<ButtonPrimaryCta onClick={openShareTarget}>Freund:in einladen</ButtonPrimaryCta>
</div>
