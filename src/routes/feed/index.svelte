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
		<div class="px-4">
			{#if posts || posts.length > 0}
				{#each posts as post}
					<div class="mb-2 px-2 py-2 bg-white">
						<a href={post.link}>{@html post.title.rendered}</a>
					</div>
				{/each}
			{/if}
		</div>
	</MainContentContainer>
</MainScreenLayoutBase>
