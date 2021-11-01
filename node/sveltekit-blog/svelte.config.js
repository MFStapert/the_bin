import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			prependData: `@import 'src/styles/main.scss';`
		}
	}),

	kit: {
		adapter: adapter(),
		target: '#svelte'
	},
	onwarn: (warning, handler) => {
		const { code, frame } = warning;
		if (code === 'css-unused-selector') return;

		handler(warning);
	}
};

export default config;
