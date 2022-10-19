<script lang="ts">
	import * as yup from 'yup';
	import { newsletterSignup, type NewsetterSignupParams } from '$lib/services/newsletter-service';
	import GdprCheckbox from '$lib/components/forms/gdpr-checkbox.svelte';
	import { yupErrorToErrorObject } from '$lib/util';
	import TextInputStyled from '$lib/components/forms/text-input-styled.svelte';
	import { slide } from 'svelte/transition';

	let schema = yup.object().shape({
		name: yup.string().required('Bitte gib einen Namen ein'),
		email: yup
			.string()
			.email('Bitte gib eine gültige Email ein')
			.required('Bitte gib eine Email ein'),
		terms_and_privacy: yup.boolean().oneOf([true], 'Dies ist ein Pflichtfeld')
	});

	let formData = { name: '', email: '', terms_and_privacy: false };
	let errors = {}, serverError = undefined;

	let animateCheck

	let submitting = false, success = false;

	const subscribeNewsletter = () => {
		schema
			.validate(formData, { abortEarly: false })
			.then((valid) => {
				if (valid) {
					errors = {};

					submitting = true
					const signupParams: NewsetterSignupParams = {
						email: formData.email,
						first_name: formData.name,
						optin: "double"
					}
					newsletterSignup( signupParams )
						.then((res) => {
							console.log('res', res);
							submitting = false;
							success = true;
							setTimeout(() => (animateCheck = true), 600);
						})
						.catch((e) => {
							submitting = false
							success = false
							console.log(e)
							serverError = e
						});
				}
			})
			.catch((errs) => {
				errors = yupErrorToErrorObject(errs);
				console.log(errors)
				setTimeout(() => (animateCheck = true), 600);
			});
	};
</script>

<div class="newsletter mx-4 ">
	<h1 class="header">Climactivity Newsletter</h1>
	<h2 class="abonieren mt-8">Newsletter abonnieren:</h2>
	<p class="blieb">
		Bleib auf dem Laufenden mit den neuesten Nachrichten von Climactivity und Veranstaltungen!
	</p>

	{#if serverError}
	<div class="text-red-500 flex flex-col">
		<span class=" font-bold">Das hat leider nicht geklappt! </span>
		<span class=" text-sm">Der Newsletter Dienst meldet: {serverError}</span>
	</div>
	{/if}
	<form class="mt-8 w-full space-y-4">

		{#if success} 
		<div transition:slide class="w-full rounded-full bg-nature font-bold text-xl text-black text-center px-4 py-2">
			Danke, dass Du unseren Newsletter aboniert hast!
			</div>

		{:else}
		<TextInputStyled binds={formData} {errors} id="name" label="Deine Name" placeholder="" />
		<TextInputStyled binds={formData} {errors} id="email" label="Deine Emailadresse" placeholder="" />

		<GdprCheckbox binds={formData} {errors} />

		<button
			class="btn rounded-full mt-4 bg-sky-500 py-2  mx-auto w-full cursor-auto focus:bg-sky-400 hover:bg-sky-400 disabled:bg-zinc-500"
			on:click|preventDefault={() => subscribeNewsletter()}
			disabled={submitting || success}
		>
			Newsletter abonnieren
		</button>
		{/if}
	</form>
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
		width: 328px;
		height: 69px;

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
