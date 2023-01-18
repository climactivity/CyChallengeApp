<script lang="ts">
	import { pb } from '$lib/pb-client';
	import { headerState } from '$lib/stores/header-store';
	headerState.set({
		backbutton: true,
		title: 'Änderungen',
		hidden: false
	});
	const changelog = pb.records.getFullList('changelogs');
	const formatDate = (date) => {
		console.log(date);
		return date.split(' ')[0];
	};
</script>

<div class="">
	{#await changelog}
		Lade Änderungen...
	{:then changes}
		{#each changes as change}
			<div class="p-4 mx-4 flex flex-col prose bg-white rounded shadow">
				<span class="font-bold">{formatDate(change.showAt)}</span>
				{@html change.content}
			</div>
		{/each}
	{/await}

	<div class="text-center text-zinc-400 text-sm p-4">
		App Version {import.meta.env.VITE_CURRENT_VERSION}
	</div>
</div>
