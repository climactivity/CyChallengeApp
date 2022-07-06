import { writable } from 'svelte/store';

import type { Match, MatchData } from '@heroiclabs/nakama-js';

export const matchstatus = writable<Match>(null);
export const matchdata = writable<MatchData>(null);
export const singlePlayer = writable<Boolean>(true);
