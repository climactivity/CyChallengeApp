<script>
	import { Capacitor, CapacitorHttp } from '@capacitor/core';
	import BlogPost from './blog-post.svelte';
	import BlogSekelton from './blog-skeleton.svelte';

	let fetchPostsGeneric = fetch('https://climactivity.de/wp-json/wp/v2/posts?_embed')
		.then((res) => res.json())
		.catch((error) => console.error(error));

	let fetchPostsCapacitor = () => {
		console.log('using capactior http...');
		const options = {
			url: 'https://climactivity.de/wp-json/wp/v2/posts?_embed'
		};

		return CapacitorHttp.get(options)
			.then((res) => res.data)
			.catch((error) => console.error('Error loading blog with Capacitor/http:', error));
	};

	let fetchPosts = Capacitor.isNativePlatform() ? fetchPostsCapacitor() : fetchPostsGeneric;
</script>

<h2 class="m-1 text-lg font-bold">Blogposts</h2>
<div class="flex overflow-x-scroll overflow-y-hidden gap-4 pb-2">
	{#await fetchPosts}
		<BlogSekelton />
	{:then posts}
		{#each posts as post}
			<div class="w-80 ">
				<BlogPost {post} />
			</div>
		{/each}
	{:catch error}
		<div>Error {error}</div>
	{/await}
</div>
