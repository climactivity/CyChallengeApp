<div
	class="relative rounded-xl bg-tutorial-card max-w-[24rem] min-h-[7.5rem] mx-auto active:pressed transition shadow-tutorial-card"
>
	<div
		class="grid grid-flow-row grid-cols-2  h-full items-stretch pl-5 z-10 py-2 relative"
		style="grid-template-columns: 1fr 6.5rem;"
	>
		<div class=" text-obnoxious text-lg flex flex-col-reverse ">Willkommen in unserer App</div>
		<div />
		<div class="  font-bold font-serif text-sm ">Klicke hier um loszulegen!</div>
	</div>
	<img
		class="absolute object-contain h-32 -top-4 -right-8"
		src="/kiko-m.svg"
		alt="Climactivity Logo Kiko"
		aria-hidden="true"
	/>
</div>

<style lang="scss">
	.text-obnoxious {
		@apply font-bold font-serif;
		--text-shadow-inner: #fff;
		--text-shadow-outer: #000;
		--shadow-spread: 0.8px;
		text-shadow: -1px -1px 0px var(--text-shadow-inner), -1px 1px 0px var(--text-shadow-inner),
			1px -1px 0px var(--text-shadow-inner), 1px 1px 0px var(--text-shadow-inner),
			-1px -1px var(--shadow-spread) var(--text-shadow-outer),
			-1px 1px var(--shadow-spread) var(--text-shadow-outer),
			1px -1px var(--shadow-spread) var(--text-shadow-outer),
			1px 1px var(--shadow-spread) var(--text-shadow-outer);
	}

	.bg-tutorial-card {
		background: linear-gradient(0deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)),
			linear-gradient(230deg, #0077b5 10%, #95c11f 93%);
		/* figma export broken, time to abuse box shadow*/

		border-radius: 1rem;
	}

	.shadow-tutorial-card {
		box-shadow: inset 0px 0px 1rem 0.25rem rgba(0 0 0 / 0.1),
			inset 0px 0px 0px 0.25rem rgba(0 0 0 / 0.1), 0 20px 25px -5px rgb(0 0 0 / 0.1),
			0 8px 10px -6px rgba(0 0 0 / 0.1);
		&:active {
			box-shadow: inset 0px 0px 1rem 0.25rem rgba(0 0 0 / 0.1),
				inset 0px 0px 0px 0.25rem rgba(0 0 0 / 0.1), 0 10px 12px -2.5px rgb(0 0 0 / 0.3),
				0 4px 5px -3px rgba(0 0 0 / 0.3);
		}
	}
</style>
