let pocketbase = await import('pocketbase');
let Client = pocketbase.default;

export const pb = new Client(import.meta.env.VITE_PB_BASE_URL);

// let pb = null;

// if (browser && import.meta.env.VITE_PB_BASE_URL) {
//     pb = new PocketBase(import.meta.env.VITE_PB_BASE_URL);
// }

// export { pb };