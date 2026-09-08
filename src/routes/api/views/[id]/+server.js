import { views } from '$lib/data/vacancy.js';

// export async function GET({ params }) {
//     const vac = vacancies.filter(v => v.isDeleted !== true)
//     const vacancy = vac.find((vac) => vac.id === +params.id)

//     return json(vacancy)
// }

export async function GET({ params }) {
	const data = views.filter((v) => v.vacId === +params.id);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const sevenDaysAgo = new Date(today);
	sevenDaysAgo.setDate(today.getDate() - 6);

	let todayViews = 0;
	let views7Days = 0;

	data.forEach((item) => {
		const itemDate = parseDate(item.createdAt);

		if (itemDate.getTime() === today.getTime()) {
			todayViews += item.count;
		}

		if (itemDate >= sevenDaysAgo && itemDate <= today) {
			views7Days += item.count;
		}
	});

	return Response.json(
		{
			success: true,
			data: {
				todayViews,
				views7Days
			}
		},
		{ status: 200 }
	);
}

function parseDate(dateStr) {
	const [day, month, year] = dateStr.split('-');
	return new Date(year, month - 1, day);
}
