<script lang="ts">
	import { page } from '$app/stores';
	import ChallengeScroller from '$lib/components/challenge/ChallengeScroller.svelte';
	import CollapsableHtmlView from '$lib/components/collapsable-html-view.svelte';
	import { pb } from '$lib/pb-client';
	import { headerState } from '$lib/stores/header-store';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';

	let monthlyChallengeReq = pb.records
		.getOne('monthly_challenges', $page.params.id, { expand: 'challenges' })
		.then((monthlyChallenge) => {
			headerState.set({
				backbutton: true,
				title: monthlyChallenge.title,
				hidden: false,
				transparent: true
			});
			return monthlyChallenge;
		});

	const getImage = (record) => {
		const imageUrl = pb.records.getFileUrl(record, record.headerImage);
		return imageUrl;
	};
</script>

{#await monthlyChallengeReq}
	...
{:then monthlyChallenge}
	<div class="space-y-6">
		<div
			class="relative overflow-hidden the-corner max-w-[24rem] min-h-[20vh] mx-auto active:pressed transition grid "
		>
			<!-- <div
			class="grid grid-flow-row h-full z-10 p-4 relative content-end bg-gradient-to-br from-transparent via-white to-white bg-opacity-0"
			style="grid-template-columns: 1fr;"
		>
			<div class="font-bold font-serif text-sm text-right ">Monats-Challenge</div>
			<div class=" text-obnoxious text-lg text-right ">{monthlyChallenge.title}</div>
		</div> -->
			<img
				class="absolute inset-0 object-cover"
				src={getImage(monthlyChallenge)}
				alt="decorative? background"
			/>
		</div>
		<CollapsableHtmlView content={monthlyChallenge.body} canCollapse={false} collapsed={false} />
		<ChallengeScroller
			challenges={monthlyChallenge['@expand'].challenges}
			pad
			challengeHidden={(_any) => false}
		/>
	</div>
{/await}
