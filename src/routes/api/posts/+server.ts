import { json } from '@sveltejs/kit';
import { fetchMarkdownPosts } from '$lib/utils/markdown';

export const GET = async () => {
    const allPosts = await fetchMarkdownPosts();

    const sortedPosts = allPosts.sort((a, b) => {
        return +new Date(b.meta.date) - +new Date(a.meta.date);
    });

    return json(sortedPosts);
};
