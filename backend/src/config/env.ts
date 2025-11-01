import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config()

// verificação do dotenv
const envSchema = z.object({
    PORT: z.string().transform(Number).default("3001"),
    DATABASE_URL: z.string().min(5, "DATABASE_URL é obrigatória"),
    NODE_ENV: z.enum(["dev", "test", "prod"], {
        message: "O Node ENV deve ser dev, test ou prod"
    }),

    //firebase
    FIREBASE_PROJECT_ID: z.string().optional(),
    FIREBASE_PRIVATE_KEY: z.string().optional(),
    FIREBASE_CLIENT_EMAIL: z.string().optional(),
})

const _env = envSchema.safeParse(process.env)
//O safeParse tenta validar as variáveis do process.env usando as regras definidas

if (!_env.success) {
    console.log("Variáveis de ambiente inválidas")
    process.exit(1) // para e avisa que tem um erro
    // 0 -> só para, 1 -> para e avisa que tem erro
}

export const env = _env.data