<script lang="ts">
	const handleSubmit = () => {
		alert('aboniert');
		console.log(this.name, this.message);
	};
</script>



<div class=" m-x-2 mt-8 ">
	<div class="mx-4 px-6 py-8 bg-white shadow rounded-lg sm:px-10  ">
		<h1 class="text-2xl font-bold tracking-wide">Climactivity kontaktieren</h1>
		<h2 class=" text-lg font-bold ">Schreib uns!</h2>
		<p class="">Wir freuen uns von dir zu hören!</p>
		<form class="mb-0 space-y-2" on:submit|preventDefault={handleSubmit}>
			<div>
				<label for="your_email" class="block  mb-1">
					Deine E-mail Adresse:
				</label>
				<input
					class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-water2-light focus:ring focus:ring-water2-light"
					id="your_email"
					type="text"
				/>
			</div>

			<div>
				<label class="block mb-1" for="message">Was möchtest du uns sagen?</label>
				<input class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-water2-light focus:ring focus:ring-water2-light" id="your_name" type="textarea" />
			</div>

		</form>
		<button
			type="submit"
			class="btn rounded-full mt-4 bg-sky-500 py-2  mx-auto w-full cursor-auto focus:bg-sky-400 hover:bg-sky-400"
		>
			Nachricht senden
		</button>
		<p class="mt-3">oder mailen uns hier:</p>
		<a href="mailto:kontatk@climactivity.de" class=" underline decoration-sky-500"
			>kontatk@climactivity.de</a
		>
	</div>
</div>

