import { error } from '@sveltejs/kit';

// TODO: sediakan api untuk get vacancy, views, totalViews sesuai dengan id

export async function load({ fetch, params }) {
	const id = params.id;

	const [resVacancies, resViews, resTotalViews] = await Promise.all([
		fetch(`/api/vacancies/${id}`),
		fetch(`/api/views/${id}`),
		fetch(`/api/totalViews/${id}`)
	]);
	if (!resVacancies.ok) error(404);

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
}
