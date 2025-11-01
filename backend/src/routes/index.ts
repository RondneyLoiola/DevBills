import type { FastifyInstance } from 'fastify'
import categoryRoutes from './category.routes'
import transactionRoutes from './transaction.routes'

async function routes(fastify: FastifyInstance): Promise <void>{
    // esse 'fastify' é uma ferramenta do framework
    fastify.get('/health', () => {
        return 'Hello World'
    })

    // registrar as rotas
    fastify.register(categoryRoutes, {prefix: '/categories'})
    fastify.register(transactionRoutes, {prefix: '/transactions'})
}

export default routes