export const formartCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        currency: "BRL",
        style: "currency",
    }).format(value)
}

export const formatDate = (date: Date | string):string => {
    //verifica se está em formato de data, se não, transforma em data
    const dateObj = date instanceof Date ? date : new Date(date)
    return new Intl.DateTimeFormat('pt-BR').format(dateObj)
}