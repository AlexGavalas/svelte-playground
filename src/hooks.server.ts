import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ resolve, event }) => {
    const cookies = event.cookies;

    const sessionID = cookies.get('sessionID');

    if (sessionID) {
        event.locals.user = jwt.decode(sessionID, { json: true }) as App.Locals['user'];
    }

    return resolve(event);
};
