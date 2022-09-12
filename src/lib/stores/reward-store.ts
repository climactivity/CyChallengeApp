import { writable } from "svelte/store"

export interface Rewards {
  score: number,
  medal: number
}

export const rewardStore = writable<Rewards>({
  score: 0,
  medal:0
});

