import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';

const production = !process.env.ROLLUP_WATCH;

const Papers = {
	input: 'src/entries/papers.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'papers',
		file: production ? 'public/dist/papers.min.js' : 'public/dist/papers.js',
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			}
		}),
        copy({
			targets: [
				{ 
					src: 'node_modules/font-awesome/fonts/*', 
					dest: 'public/fonts'
				},
				{ 
					src: 'node_modules/bootstrap-icons/font/fonts/*', 
					dest: 'public/build/fonts'
				}
			]
		}),
		css({ output: production ?  'papers.min.css' : 'papers.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
/*
const Access = {
	input: 'src/entries/access.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'access',
		file: production ? 'public/dist/access.min.js' : 'public/dist/access.js',
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			}
		}),
		css({ output: production ?  'access.min.css' : 'access.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

const Error = {
	input: 'src/entries/error.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'error',
		file: production ? 'public/dist/error.min.js' : 'public/dist/error.js',
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			}
		}),
		css({ output: production ?  'error.min.css' : 'error.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

const Web = {
	input: 'src/entries/web.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'web',
		file: production ? 'public/dist/web.min.js' : 'public/dist/web.js',
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			}
		}),
		css({ output: production ?  'web.min.css' : 'web.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

export default [App, Web, Access, ];
*/

export default [Papers, ];