<script lang="ts">
import SocialLinks from "$lib/components/social-links.svelte";

</script>

<div class="newsletter mx-4 ">
	<h1 class="header">Freund einladen</h1>
	<p class="blieb">Zur zweit macht's mehr Spass!</p>

  <form class="mt-8 w-full">
    <label class=" block" for="name">Name von Deine Freund|in:</label>
    <input type="text" class=" rounded-md" name="name" >

		<label class="block" for="email">Email von Deine Freund|in:</label>
    <input type="text" class=" rounded-md" name="email" >
    

    <button class="btn rounded-full mt-4 bg-sky-400 py-2  mx-auto w-full cursor-auto focus:bg-sky-300 hover:bg-sky-300" on:click={() => alert('eingeladen')}>
      Freund einladen
    </button>
  </form>
	<p class="">oder auf Social Media teilen:</p>
	<SocialLinks />



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
		width: 285px;
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

	.blieb{
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
  input{
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
  label{
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
