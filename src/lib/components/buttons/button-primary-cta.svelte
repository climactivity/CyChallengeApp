<script lang="ts">
	export let onClick;
</script>

<button
	class="w-full text-white font-bold font-serif text-xl bg-nature-darkest py-4 px-8 rounded"
	on:click={onClick}
>
	<slot />
</button>
