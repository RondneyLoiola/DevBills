import { FastifyReply, FastifyRequest } from "fastify";
import admin from 'firebase-admin';

declare module 'fastify' {
    interface FastifyRequest { //adiciona uma propriedade ao request
        userId?: string
    }
}

export const authMiddleware = async (
    request: FastifyRequest, 
    reply: FastifyReply
): Promise<void> => {
    //exemplo com imnsonia
    //Authorization: Bearer <token>
    const authHeader = request.headers.authorization;
    //const authHeader = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjlkMjEzMGZlZjAyNTg3ZmQ4ODYxODg2OTgyMjczNGVmNzZhMTExNjUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSml2aVJvbmRpdSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKY2lNZ2VuY19kOWZKc21QbXhWQ25wWDBGcG5kcFo1UlpidzJuX0ZlWUxrY3EwS04xQj1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kZXZiaWxscy04YzI5NyIsImF1ZCI6ImRldmJpbGxzLThjMjk3IiwiYXV0aF90aW1lIjoxNzYxMTY5MTg0LCJ1c2VyX2lkIjoiZ1J1dkxJaU1GNmFpdktFdnEwSTRpODRVMTlqMSIsInN1YiI6ImdSdXZMSWlNRjZhaXZLRXZxMEk0aTg0VTE5ajEiLCJpYXQiOjE3NjExNjkxODQsImV4cCI6MTc2MTE3Mjc4NCwiZW1haWwiOiJyb25kbmV5LmxvaW9sYTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDY4NjAxNDg4NjMxMzQyOTQ5NDIiXSwiZW1haWwiOlsicm9uZG5leS5sb2lvbGExQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.muxV3X8fkpYvMgMsfGjuk5_Ge3Xhpr8uOqjMl8VMxgSgamHVTFixiiiK1ss0JXJnFkb6BP58a-cbHwWr-elzn8c8KNazPHrpQYJluylJcTXZD9OUbLyzG-xf1v0645S8poI8_AA6aJD84NEcMbrNEuASqd1CWNqH98YYFnplDGacDJphXbUP5uELVhUozNzcv7V8FrQ-iwBfOaJ9fvt6WLqgz3zqUpMDFCQPuDoLQc-culXiTXuLiOW7Pr8x_GjzUeqI_fVZLaXjCX628FvmLIetYg2TmxIKtfOzPn06Ep_Y1lGJAFCb6UeuaOjHQgan9dCLFamEFFxtypZmwDditQ"
    
    // verifica se o que vem no authHeader começa com Bearer
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        reply.code(401).send({error: "Token de autorização não fornecido"})
        return //para de rodar se der erro
    }

    const token = authHeader.replace("Bearer ", "") //remove o Bearer do token

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        
        request.userId = decodedToken.uid
        //console.log(decodedToken)
    } catch (err) {
        request.log.error("Erro ao verificar token" + err)
        reply.code(401).send({error: "Token inválido ou expirado"})
    }

}