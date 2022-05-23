<script>
	import { SafeArea } from 'capacitor-plugin-safe-area';
	import Fa from 'svelte-fa';
	import {
		faInstagram,
		faFacebook,
		faYoutube,
		faLinkedin,
		faTwitter
	} from '@fortawesome/free-brands-svg-icons';
	import '../app.css';
	import BottomNavbar from '$lib/components/bottom-navbar.svelte';
	import { showMenu } from '$lib/stores/menu-store';
	let insets = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	};
	SafeArea.getSafeAreaInsets().then(({ insets: _insets }) => {
		insets = _insets;
	});
</script>

<div class="relative w-[100vw] h-[100vh] overflow-hidden bg-slate-100">
	<safe-area
		class="absolute"
		style="top: {insets.top}px; bottom: {insets.bottom}px; left: {insets.left}px; right: {insets.right}px;"
	>
		<main class="h-full pb-12 ">
			<div class=" h-full">
				<slot />
			</div>
		</main>
		<nav class="absolute bottom-0  w-full ">
			<BottomNavbar />
		</nav>
		<div
			class="transition-all duration-300   grid grid-flow-row place-content-center absolute
            {$showMenu
				? ' w-full h-[80vh] bottom-0 right-0 opacity-100'
				: ' w-0 h-0 -bottom-12 -right-12 opacity-0'} "
		>
			<div
				class="absolute h-[300vw] w-[300vw] -left-56 bg-gradient-to-tl from-slate-100 to-nature-light opacity-100 rounded-full"
			/>

			<div
				class=" {$showMenu ? 'opacity-100  right-8 bottom-20' : 'right-0 bottom-0 opacity-0'} 
                     absolute  grid grid-flow-row gap-2 place-content-center transition-all"
			>
				<a href="/about-us" class="overflow-menu-item">Über Climactivity</a>
				<a href="/about" class="overflow-menu-item">Über diese App</a>
				<hr class="my-4 border-1 border-black rounded-full" />
				<a href="/feedback" class="overflow-menu-item">Feedback senden</a>
				<a href="/settings" class="overflow-menu-item">Einstellungen</a>
				<a href="/imprint" class="overflow-menu-item">Impressum</a>
				<hr class="my-4 border-0 border-black rounded-full" />
				<div class="flex flex-col">
					<span class="text-storm text-xs">Vernetz Dich mit uns</span>
					<div class="flex felx-row gap-6 py-4">
						<a href="https://www.instagram.com/climactivity/" class="social-link text-black"
							><Fa icon={faInstagram} /></a
						>
						<a href="https://www.facebook.com/climactivity/" class="social-link text-[#3b5998]"
							><Fa icon={faFacebook} /></a
						>
						<a href="https://twitter.com/climactivity" class="social-link text-[#1da1f2]"
							><Fa icon={faTwitter} /></a
						>
						<a
							href="https://www.linkedin.com/company/climactivity-gemeinsam-zum-klimaziel"
							class="social-link text-[#0077b5]"><Fa icon={faLinkedin} /></a
						>
						<a
							href="https://www.youtube.com/channel/UCtvM1pUmM3KqXFxLanvoTQg"
							class="social-link text-[#cd201f]"><Fa icon={faYoutube} /></a
						>
					</div>
				</div>
			</div>
		</div>
	</safe-area>
</div>

<style lang="scss">
	.overflow-menu-item {
		@apply z-10 font-medium font-sans text-3xl;
		&:hover {
			@apply text-white;
		}
	}

	.social-link {
		@apply text-3xl;
		&:hover {
			@apply text-white;
		}
	}
</style>
