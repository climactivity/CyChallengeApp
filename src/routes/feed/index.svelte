<script lang="ts" context="module">
	export async function load({ params, fetch, session, stuff }) {
		let res = await fetch('https://climactivity.de/wp-json/wp/v2/posts/');
		let posts = await res.json();
		console.log('posts', posts);
		return {
			status: 200,
			props: {
				posts: posts
			}
		};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import BlogPost from '$lib/components/feed/blog-post.svelte';
	import Spenden from '$lib/components/feed/spenden.svelte';
	import ProportionalHeader from '$lib/components/proportional-header.svelte';

	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';
	import { headerState } from '$lib/stores/header-store';
	import { dataset_dev } from 'svelte/internal';
	import { Background } from 'tsparticles-engine';
	export let posts;
	let scrollPosition;
	headerState.set({
		backbutton: false,
		title: 'Feed',
		hidden: false
	});
	let testData = [1, 2, 3, 4, 5];
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
		<div class="px-4  ">
			<h1 class=" m-1 text-xl font-bold">Blogposts</h1>
			<div class="flex h-44 overflow-x-scroll gap-4">
				{#each posts as post}
					<div class="w-80 ">
						<BlogPost {post} />
					</div>
				{/each}
			</div>
		</div>

		<div class="border-t border-b border-gray-300 mt-2 py-2">
			<Spenden />
		</div>

		<div class="border-b mb-8 border-gray-300 mt-2 py-2">
			<div class="m-4">
				<iframe
					class="w-full aspect-video shadow-lg rounded-lg"
					src="https://www.youtube.com/embed/EaGnkNQPdsQ"
					title="climactivity - Gemeinsam zum Klimaziel"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div>
		</div>

		<div class="border-b mb-8 mt-2 py-2 ">
			<div class="m-4 ">
				<h1 class="m-1 text-xl font-bold">Teste dein Umweltwissen...!</h1>
				<div class=" flex overflow-scroll gap-4">
					{#each testData as data}
						<img class="img-card flex " src="/images/test.png" alt="" />
					{/each}
				</div>
			</div>
		</div>

		<div class="border-b mb-10 border-gray-300 mt-2 py-2 ">
			<div class="m-4">
				<h1 class="m-1 text-xl font-bold">Newsletter abonnieren:</h1>
				<p>
					Bleib auf dem Laufenden mit den neuesten Nachrichten von Climactivity und Veranstaltungen!
				</p>
				<button
					class="btn rounded-full mt-4 bg-sky-500 py-2  mx-auto w-full cursor-auto focus:bg-sky-400 hover:bg-sky-400"
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
