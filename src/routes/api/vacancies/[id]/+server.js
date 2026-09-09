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
	if (!vacancy || vacancy.isDeleted) {
		throw error(404, 'Vacancy tidak ditemukan atau sudah dihapus');
	}

	return json(vacancy);
}
