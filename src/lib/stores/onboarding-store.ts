export type OnboardingState = {
	hasOnboarded?: boolean;
	skipped?: boolean;
};

import { browser } from '$app/env';
import { goto, prefetch } from '$app/navigation';
import { writable } from 'svelte/store';

const LS_KEY_ONBOARDING = 'cy-onboarding';

const initialValue = browser ? window.localStorage.getItem(LS_KEY_ONBOARDING) ?? false : false;
let currentValue = initialValue ? JSON.parse(initialValue) : {};
export const onboarding = writable<OnboardingState>(currentValue);

onboarding.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(LS_KEY_ONBOARDING, JSON.stringify(value));
		currentValue = value;
	}
});

export const onboardingGuard = async () => {
	let onboardingOverride = import.meta.env.VITE_ONBOARD;
	console.log('onbording? ', onboardingOverride);
	if (onboardingOverride === 'always') {
		goto('/welcome');
	} else if (onboardingOverride === 'skip' || currentValue.hasOnboarded) {
		await prefetch('/sector');
		goto('/sector');
	} else {
		goto('/welcome');
	}
};
