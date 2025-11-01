import admin from 'firebase-admin';
import { env } from './env';

const initializeFirebaseAdmin = (): void => {
    if (admin.apps.length > 0) 
    return
    //se for maior que zero, significa que o firebase ja foi inicializado/ conectado
    // significa que ja tem conta conectada

    const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } = env

    if(!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) { // se não existirem
        throw new Error("♦️ Falha ao iniciar Firebase - Faltando as credenciais")
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: FIREBASE_PROJECT_ID,
                clientEmail: FIREBASE_CLIENT_EMAIL,
                privateKey: FIREBASE_PRIVATE_KEY
            })
        })
    } catch (error) {
        console.error("♦️ Falha ao conectar ao Firebase - ", error)
        process.exit(1)
    }
}

export default initializeFirebaseAdmin