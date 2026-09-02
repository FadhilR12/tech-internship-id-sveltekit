import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { vacancy } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export function load({ params }) {
    const result = db
        .select()
        .from(vacancy)
        .where(and(eq(vacancy.id, Number(params.id)), eq(vacancy.isDeleted, 0)))
        .get();

    if (!result) {
        error(404, 'Vacancy tidak ditemukan');
    }

    return {
        vacancy: result
    };
}