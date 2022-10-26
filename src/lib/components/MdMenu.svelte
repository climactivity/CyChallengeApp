<script lang="ts">
	import { SafeArea } from 'capacitor-plugin-safe-area';
	import { slide } from 'svelte/transition';
	import { showMenu } from '$lib/stores/menu-store';
	import { expoInOut } from 'svelte/easing';
	import { browser } from '$app/env';
	import SocialLinks from '$lib/components/social-links.svelte';
	import { Browser } from '@capacitor/browser';

	const openInappBrowser = async (link) => {
		await Browser.open({ url: link });
	};
</script>

{#if $showMenu}
	<div
		class="absolute inset-0 bg-slate-600 opacity-0 z-[900]"
		on:click={(e) => showMenu.set(false)}
	/>
	<div
		transition:slide={{ duration: 450, easing: expoInOut }}
		class="transition-all duration-300   grid grid-flow-row place-content-center absolute
				 w-full h-[80vh] bottom-0 right-0 opacity-100 z-[900]
				 "
	>
		<div
			class="absolute h-[300vw] w-[300vw] -left-56 bg-gradient-to-t from-white via-white to-nature-light opacity-100 rounded-full"
		/>

		<div
			class=" opacity-100  right-8 bottom-24  
                     absolute  grid grid-flow-row gap-2 place-content-center transition-all"
		>
			<!-- <a href="/info/about-us" class="overflow-menu-item">Über Climactivity</a> -->
			<span
				on:click={(e) => openInappBrowser('https://climactivity.de/ueber-uns/')}
				class="overflow-menu-item">Über Climactivity</span
			>
			<hr class="my-4 border-1 border-black rounded-full" />

			<!-- <a href="/info/about" class="overflow-menu-item">Über diese App</a> -->
			<a href="/info/changelog" class="overflow-menu-item">Änderungen</a>

			<a href="/info/settings" class="overflow-menu-item">Einstellungen</a>

			<hr class="my-4 border-1 border-black rounded-full" />
			<span
				on:click={(e) => openInappBrowser('https://climactivity.de/kontakt/')}
				class="overflow-menu-item-boring">Feedback senden</span
			>

			<span
				on:click={(e) => openInappBrowser('https://climactivity.de/impressum/')}
				class="overflow-menu-item-boring">Impressum</span
			>
			<span
				on:click={(e) => openInappBrowser('https://climactivity.de/datenschutzerklaerung/')}
				class="overflow-menu-item-boring">Datenschutzerklärung</span
			>

			<span
				on:click={(e) =>
					openInappBrowser('https://climactivity.de/ueber-uns/#kooperationspartnerinnen')}
				class="overflow-menu-item-boring">Unsere Partner</span
			>

			<hr class="my-2 border-0 border-black rounded-full" />
			<SocialLinks />
		</div>
	</div>
{/if}

<style lang="scss">
	.overflow-menu-item {
		@apply z-20 font-semibold font-serif text-3xl;
		&:hover {
			@apply text-white;
		}
	}

	.overflow-menu-item-boring {
		@apply z-20 font-medium font-serif text-xl;
		&:hover {
			@apply text-white;
		}
	}
</style>
