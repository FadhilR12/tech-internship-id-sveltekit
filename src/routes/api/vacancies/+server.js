import { vacancies } from '$lib/data/vacancy.js';
import { json } from '@sveltejs/kit';
import { getCompanyInitialRegex } from '$lib';

export function GET() {
	return json(vacancies);
}

export async function POST({ request }) {
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
		return json({ success: false });
	}

	const Id = vacancies.length > 0 ? Math.max(...vacancies.map((v) => v.id)) + 1 : 1;

	const newVacancy = {
		id: Id,
		title: fields.title,
		company: fields.company,
		companyInitial: getCompanyInitialRegex(fields.company), //TODO create companyInitial function
		workType: fields.workType,
		descHtml: fields.descHtml,
		location: fields.location,
		createdAt: String(Math.floor(Date.now() / 1000)),
		applyUrl: fields.url,
		visibleStatus: fields.visibleStatus,
		isDeleted: false,
		deletedAt: null
	};

	vacancies.push(newVacancy);

	console.log(newVacancy);
	return json({ success: true });
}
