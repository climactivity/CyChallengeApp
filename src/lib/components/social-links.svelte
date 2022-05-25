<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faInstagram,
		faFacebook,
		faYoutube,
		faLinkedin,
		faTwitter
	} from '@fortawesome/free-brands-svg-icons';

	export let showLabel = true;
</script>

<div class="flex flex-col">
	{#if showLabel}
		<span class="text-storm text-xs">Vernetz Dich mit uns</span>
	{/if}
	<div class="flex flex-row gap-6 py-4 ">
		<a
			href="https://www.instagram.com/climactivity/"
			class="text-3xl z-20 block  text-black hover:text-white"><Fa icon={faInstagram} /></a
		>
		<a
			href="https://www.facebook.com/climactivity/"
			class="text-3xl  z-20 text-[#3b5998] hover:text-white"><Fa icon={faFacebook} /></a
		>
		<a
			href="https://twitter.com/climactivity"
			class="text-3xl  z-20 text-[#1da1f2] hover:text-white"><Fa icon={faTwitter} /></a
		>
		<a
			href="https://www.linkedin.com/company/climactivity-gemeinsam-zum-klimaziel"
			class="text-3xl z-20 text-[#0077b5] hover:text-white"><Fa icon={faLinkedin} /></a
		>
		<a
			href="https://www.youtube.com/channel/UCtvM1pUmM3KqXFxLanvoTQg"
			class="text-3xl z-20 text-[#cd201f] hover:text-white"><Fa icon={faYoutube} /></a
		>
	</div>
</div>

<style lang="scss">
</style>
