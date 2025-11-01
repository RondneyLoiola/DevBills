import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../config/prisma";
import { Category } from "@prisma/client";

//express => request e response
//fastify => request e reply
export const getCategories = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const categories: Category[] = await prisma.category.findMany({
            orderBy: { name: "asc" } // ordena em ordem crescente
        })

        reply.send(categories)
    } catch (error) {
        request.log.error("Erro ao buscar categoria")
        reply.status(500).send("Erro interno do servidor")
    }
}