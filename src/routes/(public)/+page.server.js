import { vacancies } from '$lib/server/db';

export async function load() {
	const result = vacancies
		.filter((v) => v.visibleStatus === 'Shown' && v.isDeleted === false)
		.sort((a, b) => b.createdAt - a.createdAt);

	return {
		vacancies: result
	};
}