export async function load({ fetch }) {
	// const vacancies = data.vacancy.filter((vacancy) => vacancy.visibleStatus === 'Shown' && !vacancy.isDeleted).map((vacancy) => {
	//     const totalView = data.totalView.find((view) => view.vacId === vacancy.id);
	//     return {
	//         ...vacancy,
	//         viewCount: totalView?.count ?? 0
	//     };
	// });
	// return {
	//     vacancies
	// };

	const response = await fetch('/api/vacancies');
	let vacancies = await response.json();

	vacancies = vacancies.filter(
		(vacancy) => vacancy.visibleStatus === 'Shown' && vacancy.isDeleted === false
	);

	return {
		vacancies
	};
}
