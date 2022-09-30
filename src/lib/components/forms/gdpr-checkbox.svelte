<script lang="ts">
	import { slide } from 'svelte/transition';
	export let binds;
	export let errors;
</script>

<div>
	<div class="flex items-center">
		<input
			id="terms_and_privacy"
			name="terms_and_privacy"
			type="checkbox"
			class=""
			bind:checked={binds['terms_and_privacy']}
		/>
		<label for="terms_and_privacy" class="ml-2 block text-sm text-storm-darkest">
			Ich stimme den
			<a
				href="https://climactivity.de/datenschutzerklaerung/"
				class="text-water2-dark hover:text-water2">Datenschutzbedingungen</a
			> zu
		</label>
	</div>
	{#if errors && errors['terms_and_privacy']}
		<div class="text-red-500 block text-xs font-medium " transition:slide>
			{errors['terms_and_privacy']}
		</div>
	{/if}
</div>
