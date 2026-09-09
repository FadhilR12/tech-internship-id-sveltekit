import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const id = params.id;
    const response = await fetch(`/api/vacancies/${id}`);
    if (!response.ok) error(404);

    const vacancy = await response.json();

    return {
        vacancy
    };
}