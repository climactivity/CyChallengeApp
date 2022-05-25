<script lang="ts">
	import '../app.css';

	import { SafeArea } from 'capacitor-plugin-safe-area';
	import { Capacitor } from '@capacitor/core';
	import { browser } from '$app/env';
	import { App as CapacitorApp } from '@capacitor/app';

	import MdMenu from '$lib/components/MdMenu.svelte';
	import BottomNavbar from '$lib/components/bottom-navbar.svelte';
	import HeaderBar from '$lib/components/header-bar.svelte';

	let insets = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	};
	SafeArea.getSafeAreaInsets().then(({ insets: _insets }) => {
		insets = _insets;
	});

	//check if user is on safari because we'll have to change the 100vh to something else as safari covers the bottom menu

	let iOSSafari = false;
	if (browser) {
		let ua = window.navigator.userAgent;
		let iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
		let webkit = !!ua.match(/WebKit/i);
		iOSSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/FxiOS/i);
	}

	if (browser) {
		CapacitorApp.addListener('backButton', ({ canGoBack }) => {
			if (!canGoBack) {
				CapacitorApp.exitApp();
			} else {
				window.history.back();
			}
		});
	}
</script>

<svelte:head>
	<title>Climactivity Challenge App</title>
	{#if import.meta.env.VITE_DISABLE_ZOOM}
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
	{:else}
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes"
		/>
	{/if}
</svelte:head>

<div
	class="relative w-[100vw]    {Capacitor.getPlatform() === 'web' && // only apply when not running as an 'app'
	iOSSafari && // and on an iOS device
	window.innerWidth < 768 // that isn't an ipad
		? `h-[calc(100vh-80px)]`
		: 'h-[100vh]'} overflow-hidden bg-slate-100"
>
	<safe-area
		class="area"
		style="
        top: {insets.top}px;
        left: {insets.left}px;
        right: {insets.right}px;
        {iOSSafari ? `` : 'h-[100vh]'}
        "
	>
		<HeaderBar />
		<main class=" pt-16 pb-12 ">
			<div class=" h-full">
				<slot />
			</div>
		</main>
		<nav
			class="absolute
                   bottom-0
                   w-full "
		>
			<BottomNavbar />
		</nav>

		<MdMenu />
	</safe-area>
</div>

<style lang="scss">
	.overflow-menu-item {
		@apply z-20 font-medium font-sans text-3xl;
		&:hover {
			@apply text-white;
		}
	}

	.overflow-menu-item-boring {
		@apply z-20 font-medium font-sans text-xl;
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

	* {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	*::-webkit-scrollbar {
		display: none;
	}

	@supports (-webkit-touch-callout: none) {
		.area {
			/* The hack for Safari */
			height: -webkit-fill-available;
		}
	}
</style>
