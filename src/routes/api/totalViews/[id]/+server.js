import { totalViews } from '$lib/data/vacancy.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const data = totalViews.find((v) => v.vacId === +params.id);
    
    return json(data || null); 
}
