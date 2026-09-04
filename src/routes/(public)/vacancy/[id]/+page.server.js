import { error } from '@sveltejs/kit';
import data from '$lib/data/data.json';

export function load({ params }) {
    const vacancy = data.vacancy.find((item) => String(item.id) === String(params.id) && item.visibleStatus === 'Shown' && !item.isDeleted);
    if (!vacancy) error(404);

    return {
        // escape string untuk descHtml
        vacancy 
    };
}