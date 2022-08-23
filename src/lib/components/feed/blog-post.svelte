<script lang="ts">
	import { goto } from '$app/navigation';

	import type { Post } from '$lib/types/post';
	import { randomIntBetween } from '$lib/util';

	export let post: Post;

	let imageUrl = 'https://picsum.photos/id/' + randomIntBetween(1, 1000) + '/200/200';
</script>

<!-- svelte-ignore empty-block -->
{#if post}
	<a class="blog-post mt-2 bg-gray-50 rounded-sm shadow-md " href={post.link}>
		<img src="/images/E1.webp" alt="Post img" class="w-24" />
		<div class="p-2 h-32">
			<h1 class="title break-words ">{@html post.title.rendered.slice(0,75)} 	{#if post.title.rendered.length >= 75}
				<span class="">...</span>
			{/if}</h1>
		

			<h5 class="text-sm text-gray-500">
				<span>1 Juli</span> <span>-4m lesezeit</span>
			</h5>
		</div>
	</a>
{:else}
	<div class="flex items-center mt-2 w-44 animate-pulse bg-gray-50 rounded-sm " />
{/if}

<style>
	.blog-post {
		cursor: pointer;
		display: flex;
		align-items: center;
		width: 328px;
		height: 119px;
	}
	img {
		width: 156px;
		height: 119px;
	}
</style>
