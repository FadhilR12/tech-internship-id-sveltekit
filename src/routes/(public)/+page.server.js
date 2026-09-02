import { db } from '$lib/server/db';
import { vacancy } from '$lib/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function load() {
    const vacancies = db.select()
        .from(vacancy)
        .where(and(eq(vacancy.visibleStatus, 'Shown'), eq(vacancy.isDeleted, 0)))
        .orderBy(desc(vacancy.createdAt))
        .all();
    return {
        vacancies
    };
}