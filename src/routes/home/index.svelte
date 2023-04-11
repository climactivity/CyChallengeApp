<script lang="ts">
	import { goto } from '$app/navigation';

	import WirkungAktion from '$lib/components/home/wirkung-aktion.svelte';
</script>

<div class="p-4">
	<WirkungAktion />

	<button
		class="btn rounded-full mt-4 bg-sky-400 py-3  mx-auto w-full cursor-auto focus:bg-sky-300 hover:bg-sky-300"
		on:click={() => goto('/freund-einladen')}
	>
		Freund einladen
	</button>

	<div class="py-8">
		<h2 class="text-lg py-3 font-bold">Unser Partner</h2>
		<img class="w-full" src="/images/partner.svg" alt="alt" />
	</div>

	<div class="pb-8 ">
		<h2 class="text-lg py-3 font-bold">Unser App bewerten!</h2>
		<img class="w-full" src="/images/app-bewerten.svg" alt="alt" />
	</div>

	<button
		class="btn rounded-full mt-4 bg-green-400 mb-24 py-3 mx-auto w-full cursor-auto focus:bg-green-300 hover:bg-green-300"
		on:click={() => goto('/contact')}
	>
		Uns kontaktieren
	</button>
</div>
