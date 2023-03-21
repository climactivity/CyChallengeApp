<!-- <script lang="ts" context="module">
	const channelFeedUrl =
		'https://www.youtube.com/feeds/videos.xml?channel_id=UCtvM1pUmM3KqXFxLanvoTQg';

	export async function load(params) {
		let res = await params.fetch('https://climactivity.de/wp-json/wp/v2/posts?_embed');
		let posts = await res.json();

		const videoId = 'EaGnkNQPdsQ';
		return {
			status: 200,
			props: {
				posts: posts
			}
		};
	}
</script> -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import BlogEmbed from '$lib/components/feed/blog-embed.svelte';

	import Spenden from '$lib/components/feed/spenden.svelte';
	import YtEmbed from '$lib/components/feed/yt-embed.svelte';
	import ProportionalHeader from '$lib/components/proportional-header.svelte';

	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';
	import { headerState } from '$lib/stores/header-store';
	export let posts;
	let scrollPosition;
	headerState.set({
		backbutton: false,
		title: 'Feed',
		hidden: false
	});
	export let latestVideo = 'EaGnkNQPdsQ';
</script>

<MainScreenLayoutBase>
	<ProportionalHeader
		bind:scrollPosition
		backbutton={false}
		shadowOffsetStart={0}
		shadowOffsetEnd={20}
		title="Feed"
	/>

	<MainContentContainer bind:y={scrollPosition}>
		<div class="px-4 border-b border-gray-300  pb-2 ">
			<BlogEmbed />
		</div>

		<div class=" border-b border-gray-300  py-2">
			<Spenden />
		</div>

		<div class="border-b  border-gray-300 py-2">
			<YtEmbed {latestVideo} />
			<!-- <div class="m-4">
				<iframe
					class="w-full aspect-video shadow-lg rounded-lg"
					src="https://www.youtube.com/embed/EaGnkNQPdsQ"
					title="climactivity - Gemeinsam zum Klimaziel"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div> -->
		</div>

		<!-- <div class="border-b mb-8 mt-2 py-2 ">
			<div class="m-4 ">
				<h1 class="m-1 text-xl font-bold">Teste dein Umweltwissen...!</h1>
				<div class=" flex overflow-scroll gap-4">
					{#each testData as data}
						<img class="img-card flex " src="/images/test.png" alt="" />
					{/each}
				</div>
			</div>
		</div> -->

		<div class="border-b mb-10 border-gray-300 py-2 ">
			<div class="mx-4">
				<h2 class=" text-lg font-bold">Newsletter abonnieren:</h2>
				<p>
					Bleib auf dem Laufenden mit den neuesten Nachrichten von Climactivity und Veranstaltungen!
				</p>
				<button
					class="btn rounded-full mt-4 bg-water2 py-3 mb-12 mx-auto w-full cursor-pointer focus:bg-water2-light hover:bg-water2-light font-serif font-bold text-white"
					on:click={() => goto('/newsletter')}
				>
					Newsletter abonnieren
				</button>
			</div>
		</div>
	</MainContentContainer>
</MainScreenLayoutBase>

<style>
	.img-card {
		width: 140px;
		height: 100px;

		background: url(.jpg), #d9d9d9;
		border-radius: 0px 0px 0px 32px;

		/* Inside auto layout */

		flex: none;
		order: 0;
		flex-grow: 0;
	}
</style>
