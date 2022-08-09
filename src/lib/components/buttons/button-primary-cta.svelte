<script lang="ts">
	export let onClick;
	export let disabled = false;
</script>

<button
	{disabled}
	class="w-full text-[#3D3D3D] font-bold font-serif text-xl {disabled
		? 'bg-storm-light'
		: 'bg-[#31BCEE]'} transition-all  py-3 px-8 rounded-full  btn"
	on:click={onClick}
>
	<slot />
</button>

<style lang="scss">
	.btn:active {
		border-style: outset;
		transition-duration: 25ms;
		transform: translateY(3%);
	}
</style>
