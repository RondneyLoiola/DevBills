import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthYearSelectProps {
    month: number;
    year: number;
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
}

const monthNames: readonly string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const MonthYearSelect = ({ month, year, onMonthChange, onYearChange }: MonthYearSelectProps) => {

    const currentYear = new Date().getFullYear() // ano atual
    const years: number[] = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i)

    const handleNextMonth = ():void => {
        if(month === 12){
            onMonthChange(1)
            onYearChange(year + 1)
        }
        else {
            onMonthChange(month + 1)
        }
    }

    const handlePrevMonth = ():void => {
        if(month === 1 ){
            onMonthChange(12)
            onYearChange(year - 1)
        }
        else {
            onMonthChange(month - 1)
        }
    }


    return (
        <div className="flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700">
            <button
                type='button'
                className='p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer'
                aria-label='Mês anterior'
                onClick={handlePrevMonth}
            >
                <ChevronLeft />
            </button>

            <div className='flex gap-5'>
                <label htmlFor='month-select' className='sr-only'>Selecionar Mês</label>
                <select 
                value={month}
                onChange={(event) => onMonthChange(Number(event.target.value))}
                id='month-select' 
                className='bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer'>
                    {monthNames.map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
                    ))}
                </select>

                <label htmlFor='year-select' className='sr-only'>Selecionar Ano</label>
                <select 
                value={year}
                onChange={(event) => onYearChange(Number(event.target.value))}
                id='year-select' 
                className='bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer'>
                    {years.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <button
                type='button'
                className='p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer'
                aria-label='Próximo anterior'
                onClick={handleNextMonth}
            >
                <ChevronRight />
            </button>
        </div>
    )
}

export default MonthYearSelect

/*
Sem o event, você não teria como saber qual valor o usuário digitou. 
O event é como um "mensageiro" que traz essa informação para você.
*/