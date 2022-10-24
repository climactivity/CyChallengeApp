import AdapterStatic from '@sveltejs/adapter-static';
import AdapterNetlify from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import path from "path";
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: process.env.IS_NETLIFY ? AdapterNetlify({}) : AdapterStatic({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		}),
		vite: {
			ssr: {
				noExternal: ['@heroiclabs/nakama-js', '@fortawesome/free-brands-svg-icons', 'pocketbase', '@fortawesome/free-solid-svg-icons', 'onesignal-cordova-plugin']
			},
			
			resolve: {
				alias: {
					"$testData": path.resolve("./src/testData"),
					"$lib": path.resolve("./src/lib")
				}
			}
			
		

		}
	}
};

export default config;
