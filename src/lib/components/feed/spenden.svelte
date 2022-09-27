<script>
	import { goto } from '$app/navigation';
</script>

<div class="mt-8 mx-6">
	<h1 class="text-xl ">Jeder Euro hilft!</h1>
	<p>
		Unsere Organisation wird ausschließlich durch Spenden von Menschen wie Ihnen unterstützt. Schon
		ein Euro hilft, die Umwelt zum Besseren zu verändern!
	</p>
	<button
		class="btn rounded-full mt-4 bg-nature py-2  mx-auto w-full focus:bg-nature-light hover:bg-nature-light cursor-pointer font-serif font-bold"
		on:click={() =>
			goto(
				'https://www.betterplace.org/de/projects/92721-climactivity-programmstart-und-app-release'
			)}
	>
		2€ Spenden
	</button>
</div>

<style>
	h1 {
		width: 328px;
		height: 30px;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 20px;
		line-height: 30px;

		color: rgba(0, 0, 0, 0.9);
	}
	p {
		width: 328px;
		height: 92px;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		line-height: 25px;
		color: rgba(0, 0, 0, 0.9);
	}
</style>
