export async function load({ fetch }) {
    const [resVacancies, resTotalViews] = await Promise.all([
        fetch('/api/vacancies'),
        fetch('/api/totalViews')
    ]);
    const resVacanciesData = await resVacancies.json();
    const resTotalViewsData = await resTotalViews.json();

    const viewMap = {};
    resTotalViewsData.forEach(tv => {
        viewMap[tv.vacId] = tv.count;
    });
    const vacancies = resVacanciesData.map(vac => {
        return {
            ...vac,
            totalViews: viewMap[vac.id] || 0
        };
    });

    return {
        vacancies
    };
}
