// Reexport your entry components here
import { match } from '$app/paths';
import DOMPurify from 'dompurify';

export function plainText(html) {
	if (!html) return '';

	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function excerpt(text, max = 140) {
	if (!text) return '';

	if (text.length <= max) {
		return text;
	}

	return text.slice(0, max) + '...';
}

export function passedDays(timestamp) {
	const pastTime = new Date(timestamp * 1000);
	const now = new Date();
	const daysPassed = Math.floor((now - pastTime) / (1000 * 60 * 60 * 24));

	if (daysPassed === 0) {
		return 'Hari ini';
	}

	return `${daysPassed} hari lalu`;
}

export function formatDate(dateString) {
	const date = new Date(dateString * 1000);
	return date.toISOString().split('T')[0];
}

export function processVacancies(vacancies, searchQuery, sortBy, workTypeFilter) {
	let filteredVacancies = vacancies.filter((vacancy) => {
		const match = matches(vacancy, searchQuery);

		const workTypeMatch = workTypeFilter === '' || vacancy.workType === workTypeFilter;

		return match && workTypeMatch;
	});

	filteredVacancies.sort((a, b) => {
		const dateA = Number(a.createdAt);
		const dateB = Number(b.createdAt);

		if (sortBy === 'newest') return dateB - dateA;
		if (sortBy === 'oldest') return dateA - dateB;

		return 0;
	});

	return filteredVacancies;
}

export async function sanitizeHtml(html) {
	return DOMPurify.sanitize(html);
}

export function matches(vacancy, searchQuery) {
	const query = searchQuery.toLowerCase();

	return (
		vacancy.title.toLowerCase().includes(query) ||
		vacancy.company.toLowerCase().includes(query) ||
		vacancy.location.toLowerCase().includes(query)
	);
}
