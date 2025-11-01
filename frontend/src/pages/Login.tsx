//import {signInWithPopup} from "firebase/auth"
//import { firebaseAuth, googleAuthProvider } from "../config/firebase"

import { useEffect } from "react"
import { useNavigate } from "react-router"
import GoogleLoginButton from "../components/GoogleLoginButton"
import {useAuth} from '../context/AuthContext'

const Login = () => { 
    const navigate = useNavigate()
    const {signInWithGoogle, authState} = useAuth()

    const handleLogin = async () => {
        /*
        const result = await signInWithPopup(firebaseAuth, googleAuthProvider)
        console.log(result)
        */

        try {
            await signInWithGoogle()
        } catch (error) {
            console.error('Erro ao fazer login com o Google', error)
        }
    }

    useEffect(() => {
        if(authState.user && !authState.loading){ // se tiver usuário e não estiver em loading
            navigate('/dashboard')
        }
    }, [authState.user, authState.loading, navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-x-8">
                <header>
                    <h1 className="text-center text-3xl font-extrabold text-gray-50">DevBills</h1>
                    <p className="mt-2 text-center text-sm text-gray-50">Gerencie suas finanças de forma simples e eficiente.</p>
                </header>

                <main className="mt-8 bg-gray-700 py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
                    <section>
                        <h2 className="text-lg font-medium text-gray-50 mb-3">Faça login para continuar</h2>
                        <p className="mt-1 text-sm text-gray-50">Acesse sua conta para começar a gerenciar suas finanças.</p>
                    </section>

                    <GoogleLoginButton onClick={handleLogin} isLoading={false}/>

                    {authState.error && (
                        <div className="bg-red-50 text-center text-red-700 mt-4 p-4 rounded-lg">
                            <p>{authState.error}</p>
                        </div>
                    )}

                    <footer className="mt-6">
                        <p className="mt-1 text-sm text-gray-50 text-center">Ao fazer login, você concorda com nossos termos de uso e política de privacidade.</p>
                    </footer>
                </main>
            </div>
        </div>
    )
}

export default Login