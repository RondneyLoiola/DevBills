import { prismaConnect } from './config/prisma'
import app from './app'
import { initializedGlobalCategories } from './services/globalCategories.service'
import { env } from './config/env'
import initializeFirebaseAdmin from './config/firebase'

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