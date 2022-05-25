<script lang="ts">
	import StatsButton from './stats-button.svelte';
	import MenuButton from './menu-button.svelte';
	import HomeButton from './home-button.svelte';
	import FriendsButton from './friends-button.svelte';
	import JournalButton from './journal-button.svelte';
</script>

<div
	class="relative grid grid-flow-col px-2 gap-2 sm:gap-12 place-content-around sm:place-content-center select-none h-12 bg-white shadow-sm backdrop-blur-md z-20"
>
	<HomeButton path="/" />
	<JournalButton path="/journal" />
	<StatsButton path="/stats" />
	<FriendsButton path="/social" />
	<MenuButton />
</div>
