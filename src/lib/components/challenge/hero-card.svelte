<script>
	import { randomIntBetween } from '$lib/util';
</script>

<div
	class="grid grid-flow-col bg-white h-36 rounded overflow-clip ring-4 ring-storm-light p-1"
	style="grid-template-columns: 1fr 1fr;"
>
	<div class="grid place-content-center left rounded" />
	<div class="right flex flex-col">
		<span>Klimaschutz</span>
		<span>Über-</span>
		<span>sicht</span>
	</div>
</div>

<style lang="scss">
	.left {
		background-image: url(https://picsum.photos/300);
		background-size: cover;
	}
	.right {
		@apply p-4;
		:nth-child(1) {
			@apply text-xl text-storm-dark;
		}
		:nth-child(2) {
			@apply text-2xl text-water2;
		}
		:nth-child(3) {
			@apply text-6xl text-nature;
			line-height: 0.5em !important;
		}
	}
</style>
