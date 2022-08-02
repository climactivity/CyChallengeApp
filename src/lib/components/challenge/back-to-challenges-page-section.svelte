<script lang="ts">
	import { goto } from '$app/navigation';

	import ButtonPrimaryCta from '../buttons/button-primary-cta.svelte';
	import VSection from './v-section.svelte';
</script>

<VSection {...$$props}>
	<div class="grid place-content-center">
		<ButtonPrimaryCta onClick={(e) => goto('/challenges')}>
			Weitere Challenges finden
		</ButtonPrimaryCta>
	</div>
</VSection>
