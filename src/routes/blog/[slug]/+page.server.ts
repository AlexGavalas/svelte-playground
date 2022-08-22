import type { PageServerLoad } from './$types';

type Load = PageServerLoad<{ postMarkup: string; title: string; date: string }>;

export const load: Load = async ({ params }) => {
    const post = await import(`../${params.slug}.md`);
    const { title, date } = post.metadata;

    return {
        postMarkup: post.default.render().html,
        title,
        date,
    };
};
