import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const id = params.id
    const response = await fetch(`/api/vacancies/${id}`);
    const vacancy = await response.json();
    
    if (!vacancy) error(404);

    return {
        // escape string untuk descHtml
        vacancy 
    };
}