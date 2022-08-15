import { writable } from 'svelte/store';

import type { Match, MatchData } from '@heroiclabs/nakama-js';

export const matchstatus = writable<Match>(null);
export const matchdata = writable<MatchData>(null);
export const singlePlayer = writable<Boolean>(true);

 
export const insets = writable({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
});