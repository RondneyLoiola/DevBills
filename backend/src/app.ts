import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import routes from "./routes/index";
import { env } from "./config/env";
import cors from '@fastify/cors'

const app: FastifyInstance = Fastify({
    logger: {
        level: env.NODE_ENV === "dev" ? "info" : "error"
    }
});

app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
})

app.register(routes, {prefix: "/api"})
// prefixo para todas as rotas
// registra as rotas para usar fora da aplicação

export default app

