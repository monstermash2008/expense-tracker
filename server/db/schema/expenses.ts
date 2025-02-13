import { date, index, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from "zod";

export const expenses = pgTable(
    "expenses",
    {
        id: serial().primaryKey(),
        userId: text("user_id").notNull(),
        title: text("title").notNull(),
        amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
        date: date("date").notNull(),
        createdAt: timestamp("created_at").defaultNow(),
    }, (expenses) => {
        return [
            index("name_idx").on(expenses.userId),
        ];
    });

export const insertExpensesSchema = createInsertSchema(expenses, {
    title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: 'Amount must be a valid monetary value' }),
});
export const selectExpensesSchema = createSelectSchema(expenses);