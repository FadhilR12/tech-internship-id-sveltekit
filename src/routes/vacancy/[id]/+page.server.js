import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { vacancy } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export function load({ params }) {
    const result = db
        .select()
        .from(vacancy)
        .where(eq(vacancy.id, Number(params.id)))
        .get();

    if (!result) {
        error(404, 'Vacancy tidak ditemukan');
    }

    return {
        vacancy: result
    };
}