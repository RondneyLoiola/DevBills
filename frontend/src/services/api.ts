import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { firebaseAuth } from '../config/firebase'

export const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000, //tempo para esperar por uma resposta
})


api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
         const user = firebaseAuth.currentUser // recupera as infos do usuário

         if(user) {
            try {
                const token = await user.getIdToken()
                config.headers.set('Authorization', `Bearer ${token}`)
            } catch (err) {
                console.error("Erro ao obter token do usuário no firebase", err)
            }
         }

         return config

    }
)
