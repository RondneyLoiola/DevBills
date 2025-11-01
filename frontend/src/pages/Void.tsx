import { useNavigate } from "react-router"

const Void = () => {
    const navigate = useNavigate()
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center p-20" >
                <h1 className="text-4xl font-bold md:text-6xl">Página não encontrada :/</h1>
                <button onClick={() => navigate('/')} type="button" className="mt-10 bg-gray-600 p-2 rounded-lg hover:bg-gray-700 px-4 py-2 md:px-6 md:py-3">Voltar para a página inicial</button>
            </div>
        </div>
    )
}

export default Void