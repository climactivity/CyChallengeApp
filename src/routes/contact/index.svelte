<script lang="ts">
	const handleSubmit = () =>{
		alert('aboniert');
		console.log( this.name, this.message);
	}
</script>

<div class="newsletter mx-4 ">
	<h1 class="header">Climactivity kontaktieren</h1>
	<h2 class="abonieren mt-8">Schreib uns!</h2>
	<p class="blieb">Wir freuen uns von dir zu hören!</p>

	<form class="mt-8 w-full" on:submit|preventDefault={handleSubmit}>
		<label class=" block" for="name">Deine Emailadresse:</label>
		<input type="text" class=" rounded-md" name="name" />

		<label class="block" for="message">Was möchtest du uns sagen?</label>
		<input type="text" class=" rounded-md" name="message" />

		<button type="submit"
			class="btn rounded-full mt-4 bg-sky-500 py-2  mx-auto w-full cursor-auto focus:bg-sky-400 hover:bg-sky-400"
	
		>
			Nachricht senden
		</button>
	</form>
	<p class="blieb">oder mailen uns hier:</p>
	<a href="mailto:kontatk@climactivity.de" class="blieb underline decoration-sky-500">kontatk@climactivity.de</a>
</div>

<style>
	.newsletter {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 0px 0px;
		gap: 8px;
	}
	.header {
		/* width: 285px; */
		height: 36px;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 36px;
		/* identical to box height */

		text-align: center;

		color: rgba(0, 0, 0, 0.8);

		/* Inside auto layout */

		flex: none;
		order: 0;
		flex-grow: 0;
	}
	.abonieren {
		width: 328px;
		height: 30px;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 20px;
		line-height: 30px;
		/* identical to box height */

		color: rgba(0, 0, 0, 0.9);

		/* Inside auto layout */

		flex: none;
		order: 0;
		align-self: stretch;
		flex-grow: 0;
	}
	.blieb {



		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		line-height: 22px;

		color: rgba(0, 0, 0, 0.9);

		/* Inside auto layout */

		align-self: stretch;
		flex-grow: 0;
	}
	input {
		width: 98%;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0px 16px;
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		line-height: 22px;
		color: rgba(0, 0, 0, 0.9);
		flex: none;
		order: 0;
		align-self: stretch;
		flex-grow: 0;
	}
	label {
		width: 260px;
		height: 18px;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 12px;

		letter-spacing: 0.342857px;

		color: #757575;
	}
</style>
