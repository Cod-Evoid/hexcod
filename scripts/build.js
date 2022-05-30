import esbuild from 'esbuild';
import { EnvPlugin } from './plugins/env.js';
import { StatusPlugin } from './plugins/status.js';

esbuild.build({
    entryPoints: {
        hexcod: 'src/index.ts',
    },
    target: 'es2020',
    format: 'esm',
    bundle: true,
    outdir: 'lib',
    plugins: [
        EnvPlugin(),
        StatusPlugin(),
    ],
}).catch(() => process.exit(1));
