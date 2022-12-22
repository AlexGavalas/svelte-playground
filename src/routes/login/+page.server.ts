import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(303, '/');
    }
};

const USERS = [{ id: 1, username: 'testuser', password: '123' }];

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();

        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString() ?? '';

        if (!username) return fail(400, { username, missing: true });

        const user = USERS.find((user) => user.username === username && user.password === password);

        if (!user) {
            return fail(400, { username, incorrect: true });
        }

        const token = jwt.sign(user, env.JWT_KEY, { algorithm: 'HS256' });

        cookies.set('sessionID', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
            secure: !dev,
        });

        throw redirect(303, '/');
    },
};
