import { error } from '@sveltejs/kit';
import { vacancies } from '$lib/server/db';

export function load({ params }) {
	const result = vacancies.find(
		(v) => v.id === Number(params.id) && v.isDeleted === false
	);

	if (!result) {
		error(404, 'Vacancy tidak ditemukan');
	}

	return {
		vacancy: result
	};
}