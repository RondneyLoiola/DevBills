import { FastifyReply, FastifyRequest } from "fastify"
import prisma from "../../config/prisma"
import { GetTransactionsQuery } from "../../schemas/transaction.schema"
import { TransactionFilter } from "../../types/transaction.types"
// dayjs é uma biblioteca que ajuda a lidar com datas
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc" // ajuda a converter a data para UTC

dayjs.extend(utc)

export const getTransactions = async (
    // Querystring: são os filtros que vêm na URL
    request: FastifyRequest<{ Querystring: GetTransactionsQuery }>,
    reply: FastifyReply
): Promise<void> => {
    const userId = request.userId

    if (!userId) {
        reply.status(401).send({ error: "Usuário não autenticado" })
        return // para não continuar a execução, se der errado
    }

    const { month, year, categoryId, type } = request.query

    const filters: TransactionFilter = { userId } // tras as transações do usuário

    if (month && year) {
        const startDate = dayjs.utc(`${year}-${month}-01`).startOf('month').toDate()
        const endDate = dayjs.utc(startDate).endOf('month').toDate()
        filters.date = { gte: startDate, lte: endDate }
    }

    if (categoryId) {
        // filtra por categoria
        // pega o categoryId do 'filters' e coloca o categoryId que veio na query
        filters.categoryId = categoryId
    }

    if (type) {
        // filtra por tipo
        // pega o type do 'filters' e coloca o type que veio na query
        filters.type = type
    }

    try {
        const transactions = await prisma.transaction.findMany({
            where: { ...filters },
            orderBy: { date: 'desc' },
            include: {
                category: { // está relacionada a transaction no prismaschema
                    select: {
                        color: true,
                        name: true,
                        type: true
                    }
                }
            }
        })

        reply.send(transactions)
    } catch (error) {
        request.log.error("Erro ao buscar transações" + error)
        reply.status(500).send({ error: "Erro interno do servidor" })
    }
}

