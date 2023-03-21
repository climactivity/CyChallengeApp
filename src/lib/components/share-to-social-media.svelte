<script lang="ts">
	import { page } from '$app/stores';
	import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';
</script>

<div class="m-4">
	<div class="font-serif font-semibold text-md">oder teile uns direkt auf social media:</div>
	<div class="flex flex-row gap-6 py-4 mx-auto place-content-evenly">
		<a
			href={`https://www.instagram.com/?url=${$page.url.href}`}
			target="_blank"
			rel="noopener"
			class="text-5xl z-20 block  text-black "><Fa icon={faInstagram} /></a
		>
		<a
			href={`href="https://www.facebook.com/sharer/sharer.php?u=${$page.url.href}`}
			target="_blank"
			rel="noopener"
			class="text-5xl  z-20 text-black "><Fa icon={faFacebook} /></a
		>
		<a
			href={`https://twitter.com/intent/tweet?text=${$page.url.href}`}
			target="_blank"
			rel="noopener"
			class="text-5xl  z-20 text-black "><Fa icon={faTwitter} /></a
		>
	</div>
</div>
