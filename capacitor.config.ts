import { CapacitorConfig } from '@capacitor/cli';
import * as dotenv from 'dotenv';

dotenv.config();

let config: CapacitorConfig = {
	appId: 'de.climactivity.challenge',
	appName: 'Climactivity',
	webDir: 'build',
	bundledWebRuntime: false,
	plugins: {
		CapacitorHttp: {
			enabled: true
		}
	}
};

if (process.env.CAP_USE_SERVER === 'true') {
	let server = {
		url: process.env.CAP_SERVER_ADDR,
		cleartext: process.env.CAP_USE_CLEARTEXT === 'true'
	};
	config = { ...config, server };
}

console.log(config);

export default config;
