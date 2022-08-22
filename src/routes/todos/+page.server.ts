import type { PageServerLoad } from './$types';

import { getAll } from './_api';

export const load: PageServerLoad = async () => {
    // if (!locals.userid) {
    //     return {
    //         status: 401,
    //     };
    // }

    return {
        todos: getAll(),
    };
};
