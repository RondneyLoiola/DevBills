import { signOut as firebaseSignOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { firebaseAuth, googleAuthProvider } from '../config/firebase';
import type { AuthState } from '../types/auth';

interface AuthContextProps {
    authState: AuthState;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        error: null,
        loading: false
    })

    useEffect(() => {
        //onAuthStateChanged é um observer que monitora mudanças no estado de autenticação, signIn ou signOut
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => { //roda quando acontecer um signIn ou signOut
           if(user){ //se tem user, é pq tem signIn
            //console.log(user)
                setAuthState({ //pega informações do user e coloca no authState
                    user: {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    },
                    error: null,
                    loading: false
                })
           }
           else { //se não tem user, é pq tem signOut
                setAuthState({ //limpa as informações do user
                    user: null,
                    error: null,
                    loading: false
                })
           }
        }, (error) => {
            console.error('Erro na autenticação')
            setAuthState({user: null, error: error.message, loading: false})
        }
    )

     return () => unsubscribe(); //remove o observer depois que o componente for desmontado
    }, [])

    const signInWithGoogle = async (): Promise<void> => {
        //quando o signInWithGoogle for chamado, ele vai setar o loading para true
        setAuthState((prev) => ({...prev, loading:true}))//carregar
        try {
            await signInWithPopup(firebaseAuth, googleAuthProvider)
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro ao fazer login com Google'
            //instaceof verifica se o error é uma instância de Error
            
            setAuthState((prev) => ({...prev, loading:false, error: message}))//pega o estado anterior e muda apenas o error
            // diz que o erro é no signInWithGoogle
        }
    }

    const signOut = async (): Promise<void> => {
        setAuthState((prev) => ({...prev, loading:true}))

        try {
            await firebaseSignOut(firebaseAuth)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro ao fazer logout'
            setAuthState((prev) => ({...prev, loading:false, error: message}))
        }
    }

    return (
        <AuthContext.Provider value= {{ authState, signInWithGoogle, signOut }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }

    return context
}
