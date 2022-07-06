<script lang="ts">
	export let onClick;
	export let disabled = false;
</script>

<button
	{disabled}
	class="w-full text-white font-bold font-serif text-xl {disabled
		? 'bg-storm-dark'
		: 'bg-nature-darkest'} transition-colors  py-4 px-8 rounded"
	on:click={onClick}
>
	<slot />
</button>
