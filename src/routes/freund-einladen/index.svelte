<script lang="ts">
	import ShareToSocialMediaSection from '$lib/components/challenge/share-to-social-media-section.svelte';
	import FormComponent from '$lib/components/form-component.svelte';
	import SocialLinks from '$lib/components/social-links.svelte';
</script>

<div class=" m-2 mt-4 ">
	<div class="mx-4 px-6 py-8 bg-white shadow rounded-lg sm:px-10  ">
		<h1 class="text-2xl font-bold tracking-wide">Freund einladen</h1>
		<p class="text-lg font-bold">Zur zweit macht's mehr Spass!</p>
		<FormComponent />
	</div>

	<ShareToSocialMediaSection />
</div>
