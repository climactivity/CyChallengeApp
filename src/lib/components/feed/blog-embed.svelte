<script>
	import BlogPost from './blog-post.svelte';
	import BlogSekelton from './blog-skeleton.svelte';

	let fetchPosts = fetch('https://climactivity.de/wp-json/wp/v2/posts?_embed')
		.then((res) => res.json())
		.catch((error) => console.error(error));
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
