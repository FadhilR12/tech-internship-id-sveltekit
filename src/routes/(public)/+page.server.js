import data from '$lib/data/data.json';

export function load() {
    const vacancies = data.vacancy.filter((vacancy) => vacancy.visibleStatus === 'Shown' && !vacancy.isDeleted).map((vacancy) => {
        const totalView = data.totalView.find((view) => view.vacId === vacancy.id);
        return {
            ...vacancy,
            viewCount: totalView?.count ?? 0
        };
    });
    
    return {
        vacancies
    };
}
