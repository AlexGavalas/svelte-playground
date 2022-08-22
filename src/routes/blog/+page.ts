import type { Post } from '$types/post';
import type { PageLoad } from './$types';

export const load: PageLoad<{ posts: Post[] }> = async ({ fetch }) => {
    const response = await fetch(`/api/posts`);

    const posts = (await response.json()) as Post[];

    return {
        posts,
    };
};
