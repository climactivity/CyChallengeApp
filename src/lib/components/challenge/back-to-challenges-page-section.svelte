<script lang="ts">
	import { goto } from '$app/navigation';

	import ButtonPrimaryCta from '../buttons/button-primary-cta.svelte';
	import VSection from './v-section.svelte';
	export let rejected = false;
</script>

<VSection {...$$props}>
	<div class="grid place-content-center">
		<ButtonPrimaryCta onClick={(e) => goto('/challenges')}>
			{#if rejected}
				Andere Challenges finden
			{:else}
				Weitere Challenges finden
			{/if}
		</ButtonPrimaryCta>
	</div>
</VSection>
