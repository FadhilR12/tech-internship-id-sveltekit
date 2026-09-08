export async function load({ fetch }) {
	const response = await fetch('/api/vacancies?status=Shown');
	let resp = await response.json();
	if (resp.statusCode !== 200) {
		return null;
	}

	return {
		vacancies: resp.data,
	};
}
