import { prismaConnect } from './config/prisma.js'
import app from './app.js'
import { initializedGlobalCategories } from './services/globalCategories.service.js'
import { env } from './config/env.js'
import initializeFirebaseAdmin from './config/firebase.js'

const PORT = env.PORT

initializeFirebaseAdmin()//se não rodar, nao roda o server

const startServer = async () => {
    try {

        await prismaConnect()// chama a conexão ao banco de dados

        await initializedGlobalCategories() // inicializa as categorias globais

        await app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
            console.log(`✅ Server running on port ${PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}

startServer()