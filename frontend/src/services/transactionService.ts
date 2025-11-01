import type { CreateTransactionDTO, MonthlyItem, Transaction, TransactionFilter, TransactionSummary } from "../types/transactions";
import { api } from "./api";

// o Partial diz que todos os campos do TransactionFilter são opcionais
// TRAZ AS TRANSAÇÕES DO USUARIO LOGADO, COM FILTROS OPCIONAIS
export const getTransactions = async (filter?: Partial<TransactionFilter>): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/transactions', {
        params: filter // envia os filtros para o backend
    })
    return response.data
}

// TRAZ O RESUMO DE UMA TRANSAÇÃO DO USUARIO LOGADO
export const getTransactionsSummary = async (month: number, year: number): Promise<TransactionSummary> => {
    const response = await api.get<TransactionSummary>('/transactions/summary', {
        params: {
            month,
            year
        }
    })

    return response.data
}

// TRAZ O HISTORICO DE UMA TRANSAÇÃO DO USUARIO LOGADO
export const getTransactionsMonthly = async (month: number, year: number, months?: number): Promise<{ history: MonthlyItem[] }> => {
    const response = await api.get('/transactions/historical', {
        params: {
            month,
            year,
            months
        }
    })

    return response.data
}

// DELETAR UMA TRANSAÇÂO
export const deleteTransaction = async (id: string): Promise<void> => {
    await api.delete(`transactions/${id}`)
}

// CRIAR UMA TRANSAÇÃO
export const createTransaction = async (transactionData: CreateTransactionDTO): Promise<Transaction> => {
    // a api vai responder uma Transaction
    const response = await api.post<Transaction>('/transactions', transactionData)

    return response.data
    //retorna a transação criada
}
