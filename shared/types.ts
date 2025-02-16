import { insertExpensesSchema } from "../server/db/schema/expenses"

export const createExpenseSchema = insertExpensesSchema.omit({
    userId: true,
    createdAt: true,
    id: true
})

export type CreateExpense = Zod.infer<typeof createExpenseSchema>