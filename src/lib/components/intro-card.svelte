<script lang="ts">
	export let data;
	import { fly } from 'svelte/transition';

	let heroHref, content;
	console.log(data);

	$: ({ heroHref, content } = data);
</script>

<div
	class="grid grid-flow-row h-[66vh] absolute top-0"
	in:fly={{ x: 200, duration: 200 }}
	out:fly={{ x: -200, duration: 200 }}
>
	<div class="row-start-1">
		<img src={heroHref} alt="random bs" class="object-cover h-[50vh] w-[100vw] shadow-lg" />
	</div>
	<div class="row-start-2">
		<div class="grid place-content-center text-2xl text-white">
			{content}
		</div>
	</div>
</div>
