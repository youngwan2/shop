import { useEffect, useState, useCallback } from "react"

export const useFetch =  (url: string) => {
    const [data, setData] = useState<string[]>([])

    const getData =   useCallback ( async (url: string) => {
       await fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("전송실패")
                return response.json()
            })
            .then(result => setData(result))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        getData(url)

    }, [url, getData])

    return data
}