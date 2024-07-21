// vite-write-config-to-file.ts
import { ConfigEnv } from 'vite';
import config from './vite.config.mts';
import fs from 'fs';
import path from 'path';

async function writeConfigToFile() {
    // Generate the Vite configuration
    const env: ConfigEnv = { mode: 'development', command: 'serve' };
    const viteConfig = await config(env);

    // Define the path for the output file
    const outputPath = path.resolve(__dirname, 'vite-config.json');

    // Write the configuration object to the file
    fs.writeFileSync(outputPath, JSON.stringify(viteConfig, null, 2));

    console.log(`Vite configuration has been written to ${outputPath}`);
}

writeConfigToFile().catch((err) => {
    console.error('Error writing Vite configuration to file:', err);
});
