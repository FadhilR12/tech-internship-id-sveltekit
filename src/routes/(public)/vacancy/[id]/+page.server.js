import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const response = await fetch('/api/vacancies');
    const vacancies = await response.json();
    const vacancy = vacancies.find((item) => String(item.id) === String(params.id) && item.visibleStatus === 'Shown' && item.isDeleted === false);
    if (!vacancy) error(404);

    return {
        // escape string untuk descHtml
        vacancy 
    };
}