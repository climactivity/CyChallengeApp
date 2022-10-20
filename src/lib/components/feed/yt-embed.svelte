<script lang="ts">
	import EmbettyYoutube from '../embetty-svelte/embetty-youtube.svelte';

	let latestVideo = 'EaGnkNQPdsQ';
	let frameSource = `https://www.youtube.com/embed/${latestVideo}`;
</script>

<!-- <span>{latestVideo}</span> -->
<div class="m-4">
	<EmbettyYoutube videoId={latestVideo} />

	<!-- <iframe
		class="w-full aspect-video shadow-lg rounded-lg"
		src={frameSource}
		title="climactivity - Gemeinsam zum Klimaziel"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	/> -->
</div>
