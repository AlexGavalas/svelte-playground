import { invalidate } from '$app/navigation';

type EnhanceProps = {
    pending?: ({ data, form }: { data: FormData; form: HTMLFormElement }) => void;
    error?: ({
        data,
        form,
        response,
        error,
    }: {
        data: FormData;
        form: HTMLFormElement;
        response: Response | null;
        error: Error | null;
    }) => void;
    result?: ({
        data,
        form,
        response,
    }: {
        data: FormData;
        response: Response;
        form: HTMLFormElement;
    }) => void;
};

// This action allows us to progressively enhance a <form> that already works without JS
export const enhance = (
    form: HTMLFormElement,
    { pending, error, result }: EnhanceProps = {},
): { destroy: () => void } => {
    // Variable used to not resubmit a request in progress
    let working = false;

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        if (working) return;

        const data = new FormData(form);

        try {
            working = true;

            if (pending) pending({ data, form });

            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    accept: 'application/json',
                },
                body: data,
            });

            if (response.ok) {
                if (result) result({ data, form, response });

                const url = new URL(form.action);
                url.search = url.hash = '';

                // Invalidate the current page data
                await invalidate(() => true);
            } else if (error) {
                error({ data, form, error: null, response });
            } else {
                console.error(await response.text());
            }
        } catch (e: unknown) {
            if (error && e instanceof Error) {
                error({ data, form, error: e, response: null });
            } else {
                throw e;
            }
        } finally {
            working = false;
        }
    };

    form.addEventListener('submit', handleSubmit);

    return {
        destroy() {
            form.removeEventListener('submit', handleSubmit);
        },
    };
};
