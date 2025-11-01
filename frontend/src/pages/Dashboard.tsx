import { ArrowUp,  Calendar, TrendingUp, Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import {Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from "../components/Card"
import MonthYearSelect from "../components/MonthYearSelect"
import { getTransactionsMonthly, getTransactionsSummary } from "../services/transactionService"
import type { MonthlyItem, TransactionSummary } from "../types/transactions"
import { formartCurrency } from "../utils/formatters"

const initialSummary: TransactionSummary = {
    balance: 0,
    totalExpenses: 0,
    totalIncomes: 0,
    expensesByCategory: []
}

interface ChartLabel {
    categoryName: string;
    percent: number;
}

const Dashboard = () => {
    const currentDate = new Date()
    const [year, setYear] = useState<number>(currentDate.getFullYear())
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1) 
    // o getFullYear é um função do Date() que retorna o ano atual
    // o getMonth é um função do Date() que retorna o mês atual
    const [summary, setSummary] = useState<TransactionSummary>(initialSummary)
    const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([])

    useEffect(() => {
        async function loadTransactionsSummary(){
            try {
                const response = await getTransactionsSummary(month, year)
                
                setSummary(response)
            } catch (error) {
                console.error('Erro ao buscar transações:', error)
            }
        }

        loadTransactionsSummary()
    }, [month, year])

    useEffect(() => {
        async function loadTransactionsMonthly(){
            try {
                const response = await getTransactionsMonthly(month, year)
                //console.log(response)
                
                setMonthlyItemsData(response.history)
            } catch (error) {
                console.error('Erro ao buscar transações:', error)
            }
        }
    
        loadTransactionsMonthly()
    }, [month, year])

    const renderPieChartLabel = ({categoryName, percent}: ChartLabel): string => {
        return `${categoryName}: ${(percent * 100).toFixed(1)}%`
    }

    const formatToolTipValue = (value: number | string): string => {
        return formartCurrency(typeof value === 'number' ? value : 0)
    }

    return (
        <div className="container-app py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
                <MonthYearSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear}/>
                {/* onMonthChange e onYearChange são funções que recebem um parâmetro e atualizam o estado do mês e do ano */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card icon={<Wallet size={20} className="text-primary-500"/>}
                title="Saldo"
                hover
                glowEffect={summary.balance > 0}>
                    <p className={`text-2xl font-semibold mt-2 
                        ${summary.balance > 0 ? 'text-green-500' : 'text-red-300'}`}>
                    {formartCurrency(summary.balance)} 
                    </p>
                </Card>

                <Card icon={<ArrowUp size={20} className="text-primary-500"/>}
                title="Receitas"
                hover
                glowEffect={summary.totalIncomes > 0}>
                    <p className='text-2xl font-semibold mt-2 text-primary-500'>
                    {formartCurrency(summary.totalIncomes)} 
                    </p>
                </Card>

                <Card icon={<Wallet size={20} className="text-red-600"/>}
                title="Despesas"
                hover>
                    <p className='text-2xl font-semibold mt-2 text-red-600'>
                    {formartCurrency(summary.totalExpenses)} 
                    </p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-6 mt-3">
                <Card icon={<TrendingUp size={20} className="text-primary-500"/>}
                title="Despesas por Categoria" 
                className="min-h-80">

                    {summary.expensesByCategory.length > 0 ? (
                    <div className="h-72 mt-4">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    data={summary.expensesByCategory}
                                    cx='50%'
                                    cy='50%'
                                    outerRadius={80}
                                    dataKey='amount'
                                    nameKey="categoryName"
                                    label={renderPieChartLabel}
                                >
                                    {
                                        summary.expensesByCategory.map((entry) => (
                                            <Cell key={entry.categoryId} fill={entry.categoryColor}/>
                                        ))
                                    }
                                    
                                </Pie>
                                <Tooltip formatter={formatToolTipValue}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-500">
                            <p>Nenhuma despesa registrada nesse perído</p>
                        </div>
                    )}
                </Card>
                <Card icon={<Calendar size={20} className="text-primary-500"/>}
                title="Histórico Mensal"
                className="min-h-80">

                    <div className="h-72 mt-4">
                        {monthlyItemsData.length > 0 ? (
                            <ResponsiveContainer width='100%' height='100%'>
                                <BarChart
                                    data={monthlyItemsData}
                                    margin={{left: 1}}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255 255, 0.1"/>
                                    <XAxis dataKey="name" stroke="#94a3b8" tick={{style: {textTransform: 'capitalize'}, fontSize: 14}}/>
                                    <YAxis width="auto" tickFormatter={formatToolTipValue} stroke="#94a3b8" tick={{style: {fontSize: 12}}}/>
                                    <Tooltip 
                                    formatter={formatToolTipValue} 
                                    labelStyle={{color: '#f8f8f8'}}
                                    contentStyle={{
                                        backgroundColor: '#1a1a1a',
                                        borderColor: '#2a2a2a'
                                    }}
                                    />
                                    <Legend />
                                    <Bar dataKey="expenses" name='Despesas' fill="#FF6384" />
                                    <Bar dataKey="income" name='Receitas' fill="#37E359" />
                                </BarChart>
                            </ResponsiveContainer>
                        ): (
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                Nenhuma despesa registrada nesse perído
                            </div>
                        )}
                    </div>

                </Card>
            </div>
        </div>
    )
}

export default Dashboard