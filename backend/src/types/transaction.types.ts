import { TransactionType } from "@prisma/client"
import { CategorySummary } from "./category.types"

// Filtros de transações
export interface TransactionFilter {
    userId: string,
    date?: {
        gte: Date, // greater than or equal / maior ou igual
        lte: Date // less than or equal / menor ou igual
    },
    type?: TransactionType,
    categoryId?: string
}

// Resumo de transações (Dashboard)
export interface TransactionSummary {
    totalExpenses: number, //despesas 
    totalIncomes: number, //receitas 
    balance: number, //saldo
    expensesByCategory: CategorySummary[] //despesas por categoria
}