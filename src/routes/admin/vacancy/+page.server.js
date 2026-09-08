export async function load({ fetch }) {
	const [resVacancies, resTotalViews] = await Promise.all([
		fetch('/api/vacancies'),
		fetch('/api/totalViews')
	]);
	const respVacancies = await resVacancies.json();
	if (respVacancies.statusCode !== 200) {
		return null;
	}

	const resVacanciesData = respVacancies.data;
	const resTotalViewsData = await resTotalViews.json();

	const viewMap = {};
	resTotalViewsData.forEach((tv) => {
		viewMap[tv.vacId] = tv.count;
	});
	const vacancies = resVacanciesData.map((vac) => {
		return {
			...vac,
			totalViews: viewMap[vac.id] || 0
		};
	});

	return {
		vacancies
	};
}
