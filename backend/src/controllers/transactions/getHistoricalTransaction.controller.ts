import { FastifyReply, FastifyRequest } from "fastify";
import { GetHistoricalTransactionsQuery } from '../../schemas/transaction.schema';
import dayjs from "dayjs";
import prisma from "../../config/prisma";
import  utc  from "dayjs/plugin/utc";
import 'dayjs/locale/pt-br'

dayjs.extend(utc)
dayjs.locale('pt-br')

export const getHistorialTransaction = async (
    request: FastifyRequest<{ Querystring: GetHistoricalTransactionsQuery }>,
    reply: FastifyReply): Promise<void> => {
    const userId = request.userId

    if (!userId) {
        reply.status(401).send({ error: "Usuário não autenticado" })
        return // para não continuar a execução, se der errado
    }

    const { month, year, months = 6 } = request.query

    const baseDate = new Date(year, month - 1, 1)
    // month - 1 => para deixar de acordo com o javascript, humanos(janeiro = 1), javascript(janeiro = 0)
    // 1 => primeiro dia do mês

    const startDate = dayjs.utc(baseDate).subtract(months - 1, 'month').startOf('month').toDate()
    const endDate = dayjs.utc(baseDate).endOf('month').toDate()

    try {
        const transaction = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate
                }
            }, select: {
                amount: true,
                type: true,
                date: true
            }
        })

        const monthlyData = Array.from({ length: months }, (_, i) => {
            const date = dayjs.utc(baseDate).subtract(months - 1 - i, 'month')
            // i => é o índice do array, a cada iteração ele incrementa um mês com o ano

            return {
                name: date.format('MMM/YYYY'),
                income: 0,
                expenses: 0
            }
        })

        transaction.forEach(transaction => {
            const monthKey = dayjs.utc(transaction.date).format('MMM/YYYY') //verifica a data do banco de dados
            const monthData = monthlyData.find(m => m.name === monthKey)

            if (monthData) {
                if(transaction.type === 'income'){
                    monthData.income += transaction.amount
                }
                else {
                    monthData.expenses += transaction.amount
                }
            }
        })

        reply.send({history: monthlyData})
    } catch (err) {
        console.log(err)
        reply.status(500).send({ error: "Erro interno do servidor" })
    }


}