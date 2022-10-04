<script lang="ts">
</script>

{#each [0, 1, 2, 3, 4, 5, 6] as i}
	<div
		class="grid grid-flow-col place-items-center animate-pulse"
		style="grid-template-columns: 5rem 1fr;"
	>
		<div class="w-11 h-11 m-1 bg-gray-300 bg-opacity-0 rounded-full grid place-items-center" />
		<div class="place-self-start w-[70%]">
			<div class=" font-bold h-6 mt-3 bg-gray-300 rounded-full w-48" />
		</div>
	</div>
{/each}
