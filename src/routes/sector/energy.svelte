<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const title: Writable<string> = getContext('title');
	title.set('Energie');
</script>

<div>Energie Zelt</div>
