<script lang="ts">
	import GdprCheckbox from './gdpr-checkbox.svelte';

	import { makeRpc } from '$lib/client';
	import { yupErrorToErrorObject } from '$lib/util';
	import { quintOut } from 'svelte/easing';
	import { draw, fade, slide } from 'svelte/transition';
	import * as yup from 'yup';
	import TextInputStyled from './text-input-styled.svelte';

	let formData = {
		your_name: undefined,
		their_name: undefined,
		their_email: undefined,
		terms_and_privacy: false
	};

	let errors = {};
	let serverError: string = undefined;
	let submitting = false;
	let success = false;
	let animateCheck = false;
	let schema = yup.object().shape({
		your_name: yup.string().required('Bitte gib einen Namen ein'),
		their_name: yup.string().required('Bitte gib einen Namen ein'),
		their_email: yup
			.string()
			.email('Bitte gib eine gültige Email ein')
			.required('Bitte gib eine Email ein'),
		terms_and_privacy: yup.boolean().oneOf([true], 'Dies ist ein Pflichtfeld')
	});
</script>

<div class="mx-4 px-6 py-8 bg-white shadow rounded-lg sm:px-10 transition-all ">
	{#if success}
		<div class="" transition:fade={{ duration: 500, delay: 450 }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				class="w-20 h-20 mx-auto text-water2"
				stroke-width="1.5"
				stroke="currentColor"
			>
				{#if animateCheck}
					<path
						transition:draw={{ duration: 1500, easing: quintOut }}
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4.5 12.75l6 6 9-13.5"
					/>
				{/if}
			</svg>

			<div class="text-center text-storm-darkest" transition:fade={{ duration: 500, delay: 1400 }}>
				Du hast dein:e Freund:in erfolgreich zu climactivity eingeladen!
			</div>
		</div>
	{:else if serverError}
		<div class="" transition:fade={{ duration: 500, delay: 450 }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-20 h-20 mx-auto text-red-500"
			>
				<path
					transition:draw={{ duration: 1500, easing: quintOut }}
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
				/>
			</svg>

			<div class="text-center text-storm-darkest" transition:fade={{ duration: 500, delay: 1400 }}>
				Etwas ist schief gegangen 😓
				<div>
					{serverError}
				</div>
			</div>
		</div>
	{:else}
		<form class="mb-0 space-y-4 mt-3" transition:slide={{ duration: 500 }}>
			<TextInputStyled binds={formData} {errors} id="your_name" label="Dein Name" placeholder="" />
			<TextInputStyled
				binds={formData}
				{errors}
				id="their_name"
				label="Dein:e Freund:in"
				placeholder=""
			/>
			<TextInputStyled binds={formData} {errors} id="their_email" label="Email" placeholder="" />

			<GdprCheckbox binds={formData} {errors} />

			<button
				class="btn rounded-full mt-4 bg-sky-400 py-2  mx-auto w-full cursor-auto focus:bg-sky-300 hover:bg-sky-300"
				disabled={submitting}
				on:click|preventDefault={() => {
					console.log(formData);

					// validate input agains schema
					schema
						.validate(formData, { abortEarly: false })
						.then((valid) => {
							if (valid) {
								errors = {};
								// do some sort of client rpc
								submitting = true;

								makeRpc('invite_friend', { formData })
									.then((res) => {
										console.log('res', res);
										submitting = false;
										success = true;
										setTimeout(() => (animateCheck = true), 600);
									})
									.catch((res) => (serverError = res));
							}
						})
						.catch((errs) => {
							errors = yupErrorToErrorObject(errs);
							setTimeout(() => (animateCheck = true), 600);
						});

					// alert('eingeladen');
				}}
			>
				{submitting ? 'Sende' : 'Freund einladen'}
			</button>
		</form>
	{/if}
</div>
