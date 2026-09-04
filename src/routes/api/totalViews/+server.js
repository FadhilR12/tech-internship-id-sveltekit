import { totalViews } from '$lib/data/vacancy.js';
import { json } from '@sveltejs/kit';

export function GET() {
	return json(totalViews);
}