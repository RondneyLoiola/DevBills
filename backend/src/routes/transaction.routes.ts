import { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createTransactionSchema, getTransactionsSchema, getTransactionsSummarySchema, getHistoricalTransactionsSchema, deleteTransactionSchema } from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransaction.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionSummary.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getHistorialTransaction } from "../controllers/transactions/getHistoricalTransaction.controller";

const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {
    //Middleware
    fastify.addHook('preHandler', authMiddleware)

    //TODAS AS ROTAS ABAIXO, ANTES DE SEREM CHAMADAS, VÃO PASSAR PELA FUNÇÃO authMiddleware
    
    // Criação de uma transação
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: zodToJsonSchema(createTransactionSchema),
            // só funciona pq estou usando o zod 3v, no zod v4 não precisa
        },
        handler: createTransaction //chama o controller
    })

    //Buscar com Filtros
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            querystring: zodToJsonSchema(getTransactionsSchema)
        },
        handler: getTransactions

    })

    //Buscar resumo de transações
    fastify.route({
        method: 'GET',
        url: "/summary",
        schema: {
            querystring: zodToJsonSchema(getTransactionsSummarySchema)
        },
        handler: getTransactionsSummary
    })

    //Histórico de transações
    fastify.route({
        method: 'GET',
        url: "/historical",
        schema: {
            querystring: zodToJsonSchema(getHistoricalTransactionsSchema)
        },
        handler: getHistorialTransaction
    })

    //Deletar transação
    fastify.route({
        method: 'DELETE',
        url: '/:id',
        schema: {
            params: zodToJsonSchema(deleteTransactionSchema)
        },
        handler: deleteTransaction
    })
}

// queryString => filtros / body - várias infos
// params -> uma informação / id

export default transactionRoutes