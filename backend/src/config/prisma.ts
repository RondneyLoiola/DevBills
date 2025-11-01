import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// função para conectar ao banco de dados
export const prismaConnect = async () => {
    try {
        await prisma.$connect() // Conecta ao banco de dados
        console.log("✅ DB conectado com sucesso")
    } catch (error) {
        console.log("❌ Erro ao conectar ao DB", error)
    }
}

export default prisma