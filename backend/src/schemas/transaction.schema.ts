import { z } from 'zod'
import { ObjectId } from 'mongodb' //importa o ObjectId do mongodb
import { TransactionType } from '@prisma/client'

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id)
//verifica se o id é válido

//criação de transação
export const createTransactionSchema = z.object({
    description: z.string().min(1, "Descrição obrigatória"),
    amount: z.number().positive("Valor deve ser positivo"),
    date: z.coerce.date({ //coerce faz uma verificação mais profunda
        errorMap: () => ({
            message: "Data inválida"
        })
    }),
    categoryId: z.string().refine(isValidObjectId, {
        // o refine serve para validar um valor
        message: "Categoria inválida" // se for falso
    }),
    type: z.enum([TransactionType.expense, TransactionType.income], {
        errorMap: () => ({
            message: "Tipo inválido"
        })
    })
})

//busca de transações
export const getTransactionsSchema = z.object({
    month: z.string().optional(),
    year: z.string().optional(),
    type: z.enum([TransactionType.expense, TransactionType.income], {
        errorMap: () => ({
            message: "Tipo inválido"
        })
    }).optional(),
    categoryId: z.string().refine(isValidObjectId, {
        // o refine serve para validar um valor
        message: "Categoria inválida" // se for falso
    }).optional(),
})

//busca de resumo de transações
export const getTransactionsSummarySchema = z.object({
    month: z.string({message: "O mês é obrigatório"}),
    year: z.string({message: "O ano é obrigatório"}),
})

//busca de histórico de transações
export const getHistoricalTransactionsSchema = z.object({
    month: z.coerce.number().min(1).max(12),
    year: z.coerce.number().min(2000).max(2100),
    months: z.coerce.number().min(1).max(12).optional(),

})

//deletar uma transação
export const deleteTransactionSchema = z.object({
    id: z.string().refine(isValidObjectId, { //valida se é um id do mongodb
        message: "ID inválido"
    })
})

//tipos de transações
export type CreateTransactionBody = z.infer<typeof createTransactionSchema>

export type GetTransactionsQuery = z.infer<typeof getTransactionsSchema>

export type GetHistoricalTransactionsQuery = z.infer<typeof getHistoricalTransactionsSchema>

export type DeleteTransactionParams = z.infer<typeof deleteTransactionSchema>

export type GetTransactionsSummaryQuery = z.infer<typeof getTransactionsSummarySchema>

/* exemplo do que o z.infer retorna
    type GetTransactionsQuery = {
        categoryId?: string | undefined;
        type?: "expense" | "income" | undefined;
        month?: string | undefined;
        year?: string | undefined;
    }
*/