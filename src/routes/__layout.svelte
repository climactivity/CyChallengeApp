<script lang="ts">
	import '../app.css';

	import { SafeArea } from 'capacitor-plugin-safe-area';
	import { Capacitor } from '@capacitor/core';
	import { browser } from '$app/env';
	import { App as CapacitorApp } from '@capacitor/app';

	import MdMenu from '$lib/components/MdMenu.svelte';
	import BottomNavbar from '$lib/components/bottom-navbar.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { root } from 'postcss';
	import { onMount } from 'svelte';
	import { init, nkReady } from '$lib/client';
	import { insets } from '$lib/stores/context';
	import { oneSignalInit } from '$lib/push-notifications';
	import { headerState } from '$lib/stores/header-store';

	setContext('insets', insets);

	SafeArea.getSafeAreaInsets().then(({ insets: _insets }) => {
		insets.set(_insets);

		console.log('insets', JSON.stringify(_insets));
	});
	//check if user is on safari because we'll have to change the 100vh to something else as safari covers the bottom menu
	let url = $page.routeId;
	let iOSSafari = false;

	if (browser) {
		// console.log(
		// 	'import.meta.env.VITE_IGNORE_SAFARI_BOTTOM_BAR:',
		// 	import.meta.env.VITE_IGNORE_SAFARI_BOTTOM_BAR
		// );
		if (import.meta.env.VITE_IGNORE_SAFARI_BOTTOM_BAR === 'true') {
			console.info('Skipping Safari detection because VITE_IGNORE_SAFARI_BOTTOM_BAR is set');
		} else {
			let ua = window.navigator.userAgent;
			let iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
			//let webkit = !!ua.match(/WebKit/i);
			iOSSafari = iOS && !ua.match(/CriOS/i) && !ua.match(/FxiOS/i);
		}
	}

	setContext('iOSSafari', iOSSafari);

	let constrainedViewportSize = false;

	if (browser) {
		// console.warn('Viewport size x:', window.outerWidth, 'y:', window.outerHeight);
		if (window.outerWidth <= 375 || window.outerHeight <= 375) {
			constrainedViewportSize = true;
			console.warn(
				`Viewport Size constrained - w: ${window.outerWidth}, h: ${window.outerHeight} - switching to small screen layout!`
			);

			const rootElement = document.documentElement;
			rootElement.style.setProperty('--override-font-size', '10pt');

			setContext('constrainedViewportSize', constrainedViewportSize);
		}
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

	onMount(async () => {
		console.log('hi');
		if (Capacitor.getPlatform() === 'ios') {
			let root = document.documentElement;
			root.style.setProperty('--save-h-max', '95vh');
		} else {
			let root = document.documentElement;
			root.style.setProperty('--save-h-max', '95vh');
		}

		if (!$nkReady) {
			await init();
		}
		await oneSignalInit();

		console.log(
			'safari check:',
			!Capacitor.isNativePlatform(), // only apply when not running as an 'app'
			iOSSafari, // and on an iOS device
			window.innerWidth < 768
		);
	});
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
	class="relative w-[100vw]    {!Capacitor.isNativePlatform() && // only apply when not running as an 'app'
	iOSSafari && // and on an iOS device
	window.innerWidth < 768 // that isn't an ipad
		? `h-[calc(100vh-80px)]`
		: 'h-[100vh]'} overflow-hidden bg-slate-100"
>
	<safe-area
		id="safe-area"
		class="area"
		style="
        top: {$insets.top}px;
        left: {$insets.left}px;
        right: {$insets.right}px;
		bottom: {$insets.bottom}px;
        "
	>
		<!-- bottom: {iOSSafari ? `${$insets.bottom}px` : 'h-[100vh]'} -->
		<div
			class="absolute
	top-0
	w-full 
	bg-gray-100  {$headerState.transparent ? 'opacity-0' : 'opacity-100'} z-10"
			style="padding-top: {$insets.top}px"
		/>
		<main class="pb-12">
			<div class="h-full relative ">
				<!-- <PageTransition url={$page.url.href}> -->
				<slot />
				<!-- </PageTransition># -->
			</div>
		</main>
		<nav
			class="absolute
                   bottom-0
                   w-full 
				   bg-white z-[999]"
			style="padding-bottom: {$insets.bottom}px"
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
