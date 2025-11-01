import { AlertCircle, Calendar, DollarSign, Save, Tag } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import { getCategories } from "../services/categoryService";
import { createTransaction } from "../services/transactionService";
import type { Category } from "../types/category";
import { type CreateTransactionDTO, TransactionType } from "../types/transactions"

interface FormData {
    description: string;
    amount: number;
    date: string;
    categoryId: string;
    type: TransactionType
}

const initialFormData = {
    description: '',
    amount: 0,
    date: '',
    categoryId: '',
    type: TransactionType.EXPENSE
}

const TransactionsForm = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const formId = useId() //gera um id aleatório
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchCategories = async (): Promise<void> => {
            const response = await getCategories()
            setCategories(response)
        }
    
        fetchCategories()
    }, [])

    const filteredCategories = categories.filter(category => category.type === formData.type)

    const validateForm = ():boolean => {
        if(!formData.description || !formData.amount || !formData.date || !formData.categoryId) {
            setError("Preencha todos os campos!")
            return false
        }

        if(formData.amount <= 0 ){
            setError("O valor deve ser maior que zero")
            return false
        }
    
        return true
    }

    const handleTransactionType = (itemType: TransactionType) => {
        setFormData((prev) => ({...prev, type: itemType})) //vai mudar somente o type
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const {name, value} = event.target // pega o nome e o valor do input
        setFormData((prev) => ({...prev, [name]: value}))
        //[name] é uma forma de acessar dinamicamente uma propriedade de um objeto
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        setLoading(true)
        event.preventDefault() // para a tela não recarregar quando enviar o form
        setError(null)//limpa o erro antes de fazer a validação

        try {
            if(!validateForm()) {
                return
            }

            const transactionData: CreateTransactionDTO = {
                description: formData.description,
                amount: formData.amount,
                date: `${formData.date}T12:00:00.000Z`,
                categoryId: formData.categoryId,
                type: formData.type
            }

            await createTransaction(transactionData)
            toast.success("Transação adicionada com sucesso!")
            navigate("/transacoes")
            
        } catch (_error) {
            toast.error("Erro ao adicionar transação!")
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        navigate('/transacoes')
    }

    return (
        <div className="container-app py-8"> 
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Nova Transação</h1>

                <Card>

                    {error && (
                        <div className="flex items-center bg-red-300 border border-red-700 rounded-xl p-4 mb-6 gap-2">
                            <AlertCircle className="w-5 h-5 text-red-700"/>
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor={formId}>Tipo de Transação</label>
                            <TransactionTypeSelector id={formId} value={formData.type} onChange={handleTransactionType}/>
                        </div>

                        <Input 
                        label="Descrição" 
                        name="description" 
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Ex: Supermercado, Salário, etc..."
                        className={`${error && 'border-red-500'}`}
                        />

                        <Input 
                        label="Valor" 
                        name="amount" 
                        type="number"
                        step="0,01"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="R$: 0,00"
                        icon={<DollarSign className="w-4 h-4"/>}
                        required
                        className={`${error && 'border-red-500'}`}
                        />

                        <Input 
                        label="Data" 
                        name="date" 
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        icon={<Calendar className="w-4 h-4"/>}
                        className={`${error && 'border-red-500'}`}
                        />

                        <Select 
                        label="Categoria"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        icon={<Tag className="w-4 h-4"/>}
                        options={[
                            {value: '', label: "Selecione uma categoria"},
                            ...filteredCategories.map(category => ({
                                value: category.id,
                                label: category.name
                            }))
                        ]}
                        />

                        <div className="flex justify-end space-x-3 mt-2">
                            <Button variant="outline" onClick={handleCancel} type="button" disabled={loading}>Cancelar</Button>
                            <Button disabled={loading} type="submit" variant={formData.type === TransactionType.EXPENSE ? 'danger' : 'success'}>
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 h-4 m-2 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"/>
                                    </div>
                                ): (
                                    <Save className="w-4 h-4 mr-2"/>   
                                )}
                                Salvar
                            </Button>
                        </div>
     
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default TransactionsForm
