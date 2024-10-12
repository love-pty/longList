export interface IData {
    string: string,
    date: string,
    color: string
}

export const getBaseData = async (url:string): Promise<IData[]> => {
    const response = await fetch(url)
    const res:{ data:IData[] } = await response.json()
    return res.data
}