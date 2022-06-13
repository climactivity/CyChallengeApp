<script lang="ts">
	export let onClick;
</script>

<button
	class="w-full text-black border-2 border-nature-darkest font-bold font-serif text-lg bg-opacity-0 py-4 px-8 rounded"
	on:click={onClick}
>
	<slot />
</button>
