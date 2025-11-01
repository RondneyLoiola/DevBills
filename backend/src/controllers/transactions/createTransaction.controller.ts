import { FastifyReply, FastifyRequest } from "fastify"
import { CreateTransactionBody, createTransactionSchema } from "../../schemas/transaction.schema"
import prisma from "../../config/prisma"

const createTransaction = async (
    request: FastifyRequest<{Body: CreateTransactionBody}>, 
    reply: FastifyReply
): Promise<void> => {
    const userId = request.userId

    if (!userId) {
        reply.status(401).send({ error: "Usuário não autenticado" })
        return // para não continuar a execução, se der errado
    }

    const result = createTransactionSchema.safeParse(request.body)
    // safeParse é um método que valida o schema, é uma ferramenta do zod
    // dentro coloca o que deve ser enviado para o transactionschema, para fazer a validação

    if (!result.success) {
        const errorMessage = result.error.message || 'Validação inválida'

        return reply.status(500).send({ error: errorMessage })
    }

    const transaction = result.data

    //verifica se a categoria existe, no mongo e na aplicação
    //ex: apaga da aplicação mas continua com o id no mongo
    try {
        const category = await prisma.category.findFirst({
            where: {
                id: transaction.categoryId,
                type: transaction.type
            }
        })

        if (!category) {
            return reply.status(404).send({ error: "Categoria não encontrada" })
        }

        const parsedDate = new Date(transaction.date)

        const newTransaction = await prisma.transaction.create({
            data: {
                ...transaction, //envia tudo que tem dentro de transaction
                userId,
                date: parsedDate
            },
            include: {
                category: true
                //é possível incluir a categoria pois foi criada no schema com relação a transaction
            }
        })

        reply.status(201).send(newTransaction)

    } catch (error) {
        request.log.error("Erro ao criar transação")
        reply.status(500).send({ error: "Erro interno do servidor" })
    }

}

export default createTransaction