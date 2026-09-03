import { vacancies, views } from '$lib/server/db';

function formatDate(date) {
	return date.toISOString().split('T')[0];
}

export function load() {
	const today = new Date();
	const todayDate = formatDate(today);

	const sevenDaysAgo = new Date(today);
	sevenDaysAgo.setDate(today.getDate() - 6);
	const sevenDaysAgoDate = formatDate(sevenDaysAgo);

	const activeVacancies = vacancies.filter((v) => v.isDeleted === false);

	const result = activeVacancies.map((v) => {
		const vacViews = views.filter(
			(vw) => vw.vacId === v.id && vw.createdAt >= sevenDaysAgoDate
		);

		const todayViews = vacViews
			.filter((vw) => vw.createdAt === todayDate)
			.reduce((sum, vw) => sum + vw.count, 0);

		const sevenDaysViews = vacViews.reduce((sum, vw) => sum + vw.count, 0);

		return {
			id: v.id,
			title: v.title,
			company: v.company,
			companyInitial: v.companyInitial,
			visibleStatus: v.visibleStatus,
			todayViews,
			sevenDaysViews
		};
	});

	const totalTodayViews = result.reduce((acc, curr) => acc + curr.todayViews, 0);
	const totalSevenDaysViews = result.reduce((acc, curr) => acc + curr.sevenDaysViews, 0);

	const topVacancies = result
		.filter((v) => v.sevenDaysViews > 0)
		.sort((a, b) => b.sevenDaysViews - a.sevenDaysViews)
		.slice(0, 7);

	return {
		vacancies: topVacancies,
		totalTodayViews,
		totalSevenDaysViews
	};
}
