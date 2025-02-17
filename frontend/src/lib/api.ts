import { queryOptions } from "@tanstack/react-query";
import { type ApiRoutes } from "../../../server/app";
import { hc } from "hono/client";
import { CreateExpense } from "../../../shared/types";

const client = hc<ApiRoutes>("/");

export const api = client.api

async function getCurrentUser() {
    const result = await api.me.$get();
    if (!result.ok) {
        throw new Error("server error");
    }
    const data = await result.json();
    return data;
}

export const userQueryOptions = queryOptions({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity
})

export async function getAllExpenses() {
    const result = await api.expenses.$get();
    if (!result.ok) {
        throw new Error("server error");
    }
    const data = await result.json();
    return data;
}

export const getAllExpensesQueryOptions = queryOptions({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
    staleTime: 1000 * 60 * 5,
})

export async function createExpense({ value }: { value: CreateExpense }) {
    const res = await api.expenses.$post({ json: value });
    if (!res.ok) {
        throw new Error("server error");
    }

    const newExpense = await res.json();

    return newExpense
}

export const loadingCreateExpenseQueryOptions = queryOptions<{
    expense?: CreateExpense;
}>({
    queryKey: ["loading-create-expense"],
    queryFn: async () => {
        return {};
    },
    staleTime: Infinity,
});

export async function deleteExpense({ id }: { id: number }) {
    const res = await api.expenses[":id{[0-9]+}"].$delete({
        param: { id: id.toString() }
    });

    if (!res.ok) {
        throw new Error("server error");
    }
}