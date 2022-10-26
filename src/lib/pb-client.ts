import PocketBase from 'pocketbase';
// let pocketbase = await import('pocketbase');
// let Client = pocketbase.default;
const pocketbaseUrl = import.meta.env.VITE_PB_BASE_URL
console.log("PB: Connecting to Pocketbase @", pocketbaseUrl)
export const pb = new PocketBase(import.meta.env.VITE_PB_BASE_URL);

pb.beforeSend = function(url, reqConfig) {

    delete reqConfig.signal;
    return reqConfig; 
}


// export const pb = new Client(import.meta.env.VITE_PB_BASE_URL);

// let pb = null;

// if (browser && import.meta.env.VITE_PB_BASE_URL) {
//     pb = new PocketBase(import.meta.env.VITE_PB_BASE_URL);
// }

// export { pb };
