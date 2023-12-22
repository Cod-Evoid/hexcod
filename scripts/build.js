import esbuild from 'esbuild';
import { StatusPlugin } from './plugins/status.js';

const isDev = process.argv.includes('--dev'),
    config = {
        entryPoints: {
            hexcod: 'src/index.ts',
        },
        target: 'es2020',
        format: 'esm',
        bundle: true,
        outdir: 'lib',

        minify: !isDev,
        treeShaking: !isDev,
        sourcemap: isDev,

        plugins: [
            StatusPlugin(),
        ],
    };

if (isDev)
    (await esbuild.context(config)).watch();
else
    await esbuild.build(config);
