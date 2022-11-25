<script lang="ts">
	import { pb } from '$lib/pb-client';

	let currentMonthlyChallengeRequest = fetch(
		import.meta.env.VITE_PB_BASE_URL + '/current-monthly-challenge'
	).then(async (data) => await data.json());

	const getImage = (record) => {
		const imageUrl = pb.records.getFileUrl(record, record.headerImage, { thumb: '512x256' });
		return imageUrl;
	};
</script>

{#await currentMonthlyChallengeRequest}
	lade
{:then currentMonthlyChallenge}
	<div
		class="relative overflow-hidden rounded-xl max-w-[24rem] min-h-[7.5rem] mx-auto active:pressed transition shadow grid "
	>
		<div
			class="grid grid-flow-row h-full z-10 p-4 relative content-end bg-gradient-to-br from-transparent via-white to-white bg-opacity-0"
			style="grid-template-columns: 1fr;"
		>
			<div class="font-bold font-serif text-sm text-right ">Monats-Challenge</div>
			<div class=" text-obnoxious text-lg text-right ">{currentMonthlyChallenge.title}</div>
		</div>
		<img class="absolute inset-0 " src={getImage(currentMonthlyChallenge)} />
	</div>
{/await}

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
