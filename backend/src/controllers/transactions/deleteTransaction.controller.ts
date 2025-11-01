import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteTransactionParams } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";

export const deleteTransaction = async (
    request: FastifyRequest<{ Params: DeleteTransactionParams }>,
    reply: FastifyReply
): Promise<void> => {
    //const userId = "rondneyid"
    const userId = request.userId
    const { id } = request.params

    if (!userId) {
        reply.status(401).send({ error: "Usuário não autenticado" })
        return // para não continuar a execução, se der errado
    }

    try {
        const transaction = await prisma.transaction.findFirst({
            where: {
                id, 
                userId
            }
            // verifica se há uma transação, e vê se o id bate com o userId do mongo
            // fazer que um usuário não possa deletar uma transação de outro usuário
        })

        if(!transaction){
            reply.status(400).send({error: "Id da transação inválido"})
            return
        }

        await prisma.transaction.delete({
            where: {
                id
            }
        })

        reply.status(200).send({message: "Transação deletada com sucesso"})
    } catch (error) {
        request.log.error({message: "Erro ao deletar transação", error})
        reply.status(500).send({error: "Erro interno do servidor, falha ao deletar transação"})
    }

}