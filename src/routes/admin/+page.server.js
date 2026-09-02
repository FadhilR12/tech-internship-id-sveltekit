import { db } from '$lib/server/db';
import { vacancy, view } from '$lib/server/db/schema';
import { and, eq, gte, sql } from 'drizzle-orm';

function formatDate(date) {
	return date.toISOString().split('T')[0];
}

export function load() {
	const today = new Date();

	const todayDate = formatDate(today);

	const sevenDaysAgo = new Date(today);
	sevenDaysAgo.setDate(today.getDate() - 6);

	const sevenDaysAgoDate = formatDate(sevenDaysAgo);

	const vacancies = db
		.select({
			id: vacancy.id,
			title: vacancy.title,
			company: vacancy.company,
			companyInitial: vacancy.companyInitial,
			visibleStatus: vacancy.visibleStatus,

			todayViews: sql`
				COALESCE(
					SUM(
						CASE
							WHEN ${view.createdAt} = ${todayDate}
							THEN ${view.count}
							ELSE 0
						END
					),
					0
				)
			`.mapWith(Number),

			sevenDaysViews: sql`
				COALESCE(
					SUM(${view.count}),
					0
				)
			`.mapWith(Number)
		})
		.from(vacancy)
		.leftJoin(view, and(eq(vacancy.id, view.vacId), gte(view.createdAt, sevenDaysAgoDate)))
		.where(eq(vacancy.isDeleted, false))
		.groupBy(vacancy.id)
		.all();

	const totalTodayViews = vacancies.reduce((acc, curr) => acc + curr.todayViews, 0);
	const totalSevenDaysViews = vacancies.reduce((acc, curr) => acc + curr.sevenDaysViews, 0);

	const topVacancies = vacancies
		.filter((v) => v.sevenDaysViews > 0)
		.sort((a, b) => b.sevenDaysViews - a.sevenDaysViews)
		.slice(0, 7);

	return {
		vacancies: topVacancies,
		totalTodayViews,
		totalSevenDaysViews
	};
}
