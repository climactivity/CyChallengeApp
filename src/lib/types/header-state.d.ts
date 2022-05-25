import type { SvelteComponent } from 'svelte';

export type HeaderState = {
	title: string;
	backbutton: boolean;
	action?: SvelteComponent;
	back?: () => void;
	hidden: boolean;
};
