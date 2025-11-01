import { Navigate, Outlet } from "react-router"
import { useAuth } from "../context/AuthContext"

const PrivateRoutes = () => {
    const {authState} = useAuth()
    //console.log(authState)

    if(!authState.user) { // se não tiver autenticação, volta para tela de login
        return <Navigate to='/login' replace/>
        // só vai para a tela de dashboard se tiver logado
    }

    return (
        <Outlet/> // se tiver autenticação, mostra o conteúdo protegido
    )
}

export default PrivateRoutes