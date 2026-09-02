import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const vacancy = sqliteTable('vacancy', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(), 
    company: text('company').notNull(), 
    companyInitial: text('companyInitial').notNull(), 
    workType: text('workType').notNull(),  
    descHtml: text('descHtml').notNull(), 
    location: text('location').notNull(), 
    createdAt: integer('createdAt').notNull(), 
    applyUrl: text('applyUrl').notNull(), 
    visibleStatus: text('visibleStatus').notNull(), 
    isDeleted: integer('isDeleted', { mode: 'boolean' }),
    deletedAt: integer('deletedAt') 
});

export const totalView = sqliteTable('totalView', {
    vacId: integer('vacId').notNull().primaryKey(),
    count: integer('count').notNull()
});

export const view = sqliteTable('view', {
    vacId: integer('vacId').notNull(),
    createdAt: text('createdAt').notNull(), 
    count: integer('count').notNull()
}, (table) => ({
    pk: primaryKey({ columns: [table.vacId, table.createdAt] })
}));