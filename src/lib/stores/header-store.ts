import type { HeaderState } from "$lib/types/header-state";
import { setContext } from "svelte";
import { type Writable, writable } from "svelte/store";

export const headerState: Writable<HeaderState> = writable({
    title: '',
    backbutton: false,
    action: undefined,
    back: undefined,
    hidden: false
});

