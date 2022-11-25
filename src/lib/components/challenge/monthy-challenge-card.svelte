<script lang="ts">
	import type { MonthlyChallenge } from '$lib/types/challenges';

	export let currentMonthlyChallenge: MonthlyChallenge;
	import { pb } from '$lib/pb-client';
	import { goto } from '$app/navigation';

	const getImage = (record) => {
		const imageUrl = pb.records.getFileUrl(record, record.headerImage, { thumb: '512x256' });
		return imageUrl;
	};
</script>

<div
	on:click={(e) => goto(`/monthly-challenge/${currentMonthlyChallenge.id}`)}
	class="relative overflow-hidden rounded-xl max-w-[24rem] min-h-[7.5rem] mx-auto active:pressed transition shadow grid "
>
	<div
		class="grid grid-flow-row h-full z-10 p-4 relative content-end bg-gradient-to-br from-transparent via-white to-white bg-opacity-0"
		style="grid-template-columns: 1fr;"
	>
		<div class="font-bold font-serif text-sm text-right ">Monats-Challenge</div>
		<div class=" text-obnoxious text-lg text-right ">{currentMonthlyChallenge.title}</div>
	</div>
	<img
		class="absolute inset-0 "
		src={getImage(currentMonthlyChallenge)}
		alt="decorative? background"
	/>
</div>

<style lang="scss">
	// .text-obnoxious {
	// 	@apply font-bold font-serif;
	// 	--text-shadow-inner: #fff;
	// 	--text-shadow-outer: #000;
	// 	--shadow-spread: 0.8px;
	// 	text-shadow: -1px -1px 0px var(--text-shadow-inner), -1px 1px 0px var(--text-shadow-inner),
	// 		1px -1px 0px var(--text-shadow-inner), 1px 1px 0px var(--text-shadow-inner),
	// 		-1px -1px var(--shadow-spread) var(--text-shadow-outer),
	// 		-1px 1px var(--shadow-spread) var(--text-shadow-outer),
	// 		1px -1px var(--shadow-spread) var(--text-shadow-outer),
	// 		1px 1px var(--shadow-spread) var(--text-shadow-outer);
	// }
</style>
