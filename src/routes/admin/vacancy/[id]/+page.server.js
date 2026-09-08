import { error } from '@sveltejs/kit';

// TODO: sediakan api untuk get vacancy, views, totalViews sesuai dengan id

export async function load({ fetch, params }) {
	const id = params.id;

	try {
		const [resVacancies, resViews, resTotalViews] = await Promise.all([
			fetch(`/api/vacancies/${id}`),
			fetch(`/api/views/${id}`),
			fetch(`/api/totalViews/${id}`)
		]);

		const vacancy = await resVacancies.json();
		const viewsResponse = await resViews.json();
		const totalViewsData = await resTotalViews.json();
		const viewsData = viewsResponse.data || {};

		return {
			vacancy: vacancy,
			totalViews: totalViewsData ? totalViewsData.count || totalViewsData.totalViews || 0 : 0,
			todayViews: viewsData.todayViews || 0,
			sevenDayViews: viewsData.views7Days || 0
		};
	} catch (error) {
		console.error('Terjadi error saat load data:', error);

		return {
			vacancy: null,
			totalViews: 0,
			todayViews: 0,
			sevenDayViews: 0
		};
	}
}
