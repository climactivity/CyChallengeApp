<script lang="ts">
	import ShareToSocialMediaSection from '$lib/components/challenge/share-to-social-media-section.svelte';
	import SocialLinks from '$lib/components/social-links.svelte';
</script>

<div class=" m-2 mt-4 ">

	<div class="mx-4 px-6 py-8 bg-white shadow rounded-lg sm:px-10  ">
		<form class="mb-0 space-y-6">
			<h1 class="text-2xl font-bold tracking-wide">Freund einladen</h1>
			<p class="text-lg font-bold">Zur zweit macht's mehr Spass!</p>
			<div>
				<label for="your_name" class="block text-sm font-medium mb-1"> Dein Name </label>
				<input
					class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-water2-light focus:ring focus:ring-water2-light"
					id="your_name"
					type="text"
				/>
			</div>

			<div>
				<label for="their_name" class="block text-sm font-medium"> Dein:e Freund:in </label>
				<input class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-water2-light focus:ring focus:ring-water2-light" id="your_name" type="text" />
			</div>

			<div>
				<label for="their_email" class="block text-sm font-medium"> Email </label>
				<input class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-water2-light focus:ring focus:ring-water2-light" id="your_name" type="text" />
			</div>
			<button
				class="btn rounded-full mt-4 bg-sky-400 py-2  mx-auto w-full cursor-auto focus:bg-sky-300 hover:bg-sky-300"
				on:click={() => alert('eingeladen')}
			>
				Freund einladen
			</button>
		</form>
	</div>

	<ShareToSocialMediaSection />
</div>
