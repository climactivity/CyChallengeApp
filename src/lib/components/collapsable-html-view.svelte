<script lang="ts">
	export let content;
	export let collapsed = false;
	export let collapsedSize = '8rem';
	export let canCollapse = true;

	const toggleCollapsed = (e) => {
		if (canCollapse) {
			collapsed = !collapsed;
		}
	};
</script>

<div
	class="prose mx-4 rounded-xl p-2 bg-white collapsable {collapsed ? 'collapsed' : 'expanded'}"
	on:click={toggleCollapsed}
	style="--collapsed-size: {collapsedSize};"
>
	{@html content}
</div>

<style lang="scss">
	.collapsable {
		--collapsed-size: 8rem;
		&::after,
		&::before {
			position: absolute;
			bottom: 0px;
			left: 0px;
			right: 0px;
			transition: all 0.5s ease-in-out;
		}
		&::before {
			z-index: 10;
			content: '...mehr';
			text-align: center;
			@apply text-water2 font-bold;
			height: 2rem;
		}

		&::after {
			content: '';
			background: linear-gradient(
				0deg,
				rgba(255 255 255 / 1),
				rgba(255 255 255 / 1) 50%,
				rgba(255 255 255 / 0)
			);
			height: calc(var(--collapsed-size) / 2 + 1rem);
		}
	}
	.expanded {
		max-height: 70rem;
		transition: max-height 0.3s ease-out;
		&::before,
		&::after {
			opacity: 0;
		}
	}
	.collapsed {
		position: relative;
		transition: max-height 0.4s ease-in;
		max-height: var(--collapsed-size, 5rem);
		overflow: hidden;
		&::before,
		&::after {
			opacity: 1;
		}
	}
</style>
