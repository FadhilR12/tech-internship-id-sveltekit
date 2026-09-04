import data from '$lib/data/data.json';

export function load() {
    const viewMap = {};
    data.totalView.forEach(tv => {
        viewMap[tv.vacId] = tv.count;
    });
    const vacancies = data.vacancy.map(vac => {
        return {
            ...vac,
            totalViews: viewMap[vac.id] || 0
        };
    });

    return {
        vacancies
    };
}
