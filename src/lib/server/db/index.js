import { readFileSync } from 'fs';
import { resolve } from 'path';

const raw = readFileSync(resolve('src/data.json'), 'utf-8');
const data = JSON.parse(raw);

/**
 * Konversi format relatif ("now", "now-1-day", "now-3-days")
 * menjadi unix timestamp (detik) agar kompatibel dengan helper
 * passedDays() dan formatDate() di frontend.
 */
function relativeToTimestamp(relative) {
	const now = new Date();

	if (relative === 'now') {
		return Math.floor(now.getTime() / 1000);
	}

	const match = relative.match(/^now-(\d+)-days?$/);
	if (match) {
		const daysAgo = parseInt(match[1], 10);
		const past = new Date(now);
		past.setDate(past.getDate() - daysAgo);
		return Math.floor(past.getTime() / 1000);
	}

	// Fallback: jika sudah berupa angka atau format lain
	return typeof relative === 'number' ? relative : Math.floor(now.getTime() / 1000);
}

export const vacancies = data.vacancy.map((v) => ({
	...v,
	createdAt: relativeToTimestamp(v.createdAt),
	deletedAt: v.deletedAt ? relativeToTimestamp(v.deletedAt) : null
}));

export const totalViews = data.totalView;
export const views = data.view;