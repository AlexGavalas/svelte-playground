import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', '.md'],
    preprocess: [
        preprocess({
            postcss: {
                plugins: [autoprefixer],
            },
        }),
        mdsvex({
            extensions: ['.md'],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
            // layout: {
            // 	blog: 'src/routes/blog/post.svelte'
            // }
        }),
    ],
    kit: {
        adapter: adapter(),

        methodOverride: {
            allowed: ['PATCH', 'DELETE'],
        },

        prerender: {
            default: true,
        },
    },
};

export default config;
