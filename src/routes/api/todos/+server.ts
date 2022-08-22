import type { RequestHandler } from '@sveltejs/kit';

import { add, remove, update } from '../../todos/_api';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const POST: RequestHandler = async ({ request }) => {
    await wait(500);

    // if (!locals.userid) {
    //     return new Response('Unauthorized!', { status: 401 });
    // }

    const form = await request.formData();

    const text = form.get('text')?.toString();

    if (!text) return new Response('Text not provided!', { status: 400 });

    add(text);

    return new Response('Created!', { status: 201 });
};

// If the user has JavaScript disabled, the URL will change to
// include the method override unless we redirect back to /todos
const redirect = {
    status: 303,
    headers: {
        location: '/todos',
    },
};

export const PATCH: RequestHandler = async ({ request }) => {
    await wait(500);

    // if (!locals.userid) {
    //     return {
    //         status: 401,
    //     };
    // }

    const form = await request.formData();

    const uid = form.get('uid')?.toString();
    const text = form.get('text')?.toString();
    const done = form.has('done') ? !!form.get('done') : undefined;

    if (!uid) return new Response('ID not provided!', { status: 400 });

    update({ text, done, uid });

    return new Response('Done', redirect);
};

export const DELETE: RequestHandler = async ({ request }) => {
    await wait(500);

    // if (!locals.userid) {
    //     return {
    //         status: 401,
    //     };
    // }

    const form = await request.formData();

    const uid = form.get('uid')?.toString();

    if (!uid) return new Response('UID not provided!', { status: 400 });

    remove(uid);

    return new Response('Done', redirect);
};
