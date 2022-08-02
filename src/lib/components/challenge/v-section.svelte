<script lang="ts">
	export let last = false;
	export let index = 0;
</script>

<div class=" my-4 py-4 px-4 {last ? 'border-b-0' : 'border-b'} border-stone-200">
	<slot />
</div>
