import { browser } from '$app/env';
import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_PB_BASE_URL);

// let pb = null;

// if (browser && import.meta.env.VITE_PB_BASE_URL) {
//     pb = new PocketBase(import.meta.env.VITE_PB_BASE_URL);
// }

// export { pb };
