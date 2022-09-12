<form class="mb-0 space-y-4 mt-3">
	<div>
		<label for="your_name" class="block text-sm font-medium mb-1"> Dein Name </label>
		<input
			class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-water2-light focus:ring focus:ring-water2-light"
			id="your_name"
			type="text"
		/>
	</div>

	<div>
		<label for="their_name" class="block text-sm font-medium"> Dein:e Freund:in </label>
		<input
			class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-water2-light focus:ring focus:ring-water2-light"
			id="your_name"
			type="text"
		/>
	</div>

	<div>
		<label for="their_email" class="block text-sm font-medium"> Email </label>
		<input
			class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-water2-light focus:ring focus:ring-water2-light"
			id="your_name"
			type="text"
		/>
	</div>
	<button
		class="btn rounded-full mt-4 bg-sky-400 py-2  mx-auto w-full cursor-auto focus:bg-sky-300 hover:bg-sky-300"
		on:click={() => alert('eingeladen')}
	>
		Freund einladen
	</button>
</form>
