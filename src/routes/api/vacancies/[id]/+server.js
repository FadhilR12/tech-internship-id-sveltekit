import { vacancies } from '$lib/data/vacancy.js';
import { error, json } from '@sveltejs/kit';

export async function DELETE({ params }) {
	// cari id
	const vacancyIndex = vacancies.findIndex((vac) => vac.id === +params.id);
	if (vacancyIndex === -1) error(404);
	// delete object yang memiliki id yang sama
	vacancies[vacancyIndex] = {
		...vacancies[vacancyIndex],
		isDeleted: true,
		deletedAt: String(Math.floor(Date.now() / 1000))
	};

	return new Response(null, { status: 204 });
}
export async function PUT({ params, request }) {
	// ambil data dari form
	const data = await request.formData();
	const fields = Object.fromEntries(data.entries());
	if (
		fields.title === '' ||
		fields.location === '' ||
		fields.workType === '' ||
		fields.url === '' ||
		fields.location === '' ||
		fields.descHtml === ''
	) {
		new Response(null, { status: 404 });
	}

	// cari id
	const vacancyIndex = vacancies.findIndex((vac) => vac.id === +params.id);
	if (vacancyIndex === -1) error(404);
	// delete object yang memiliki id yang sama
	vacancies[vacancyIndex] = {
		...vacancies[vacancyIndex],
		...fields
	};

	return new Response(null, { status: 204 });
}

// TODO UBAH MENJADI STANDARD API
export async function GET({ params }) {
	const vacancy = vacancies.find((vac) => vac.id === +params.id);
	if (vacancy.isDeleted) return null;

	return json(vacancy);
}
