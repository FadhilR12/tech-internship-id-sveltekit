import { vacancies } from '$lib/data/vacancy.js';
import { json } from '@sveltejs/kit';
import { getCompanyInitialRegex } from '$lib';

// API UNTUK SEMENTARA KEDEPANNYA PERLU DIBEDAKAN API LANDING PAGE DAN ADMIN
export function GET({ url }) {
	const statusQuery = url.searchParams.get('status');
	const isDeletedQuery = url.searchParams.get('is_deleted');

	let vacs = [];

	vacs = vacancies.filter(v => {
		let statusValid = true;
		let isDeletedValid = true;

		// Filter status
		if (statusQuery !== '') {
			// ?status=Shown or ?status=Hidden
			if (statusQuery === 'Shown' || statusQuery === 'Hidden') {
				statusValid = v.visibleStatus === statusQuery;
			}
		}

		// Filter isDeleted
		if (isDeletedQuery !== '') {
			// ?is_deleted=true
			if (isDeletedQuery === 'true') {
				isDeletedValid = v.isDeleted;
			} else {
				isDeletedValid = !v.isDeleted;
			}
		}
		
		return statusValid && isDeletedValid;
	});

	return json({
		statusCode: 200,
		data: vacs,
		message: 'get all vacancies success'
	});
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
	return json({ success: true });
}
