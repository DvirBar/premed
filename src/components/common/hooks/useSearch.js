import { useEffect, useState } from 'react'

function useSearch(array, keyword, escapeEmpty) {
    const [filtered, setFiltered] = useState(array)

    useEffect(() => {
        if(!keyword || keyword === '') {
            setFiltered(array)
        }

        else {
            setFiltered(array.filter(item =>
                item.name.includes(keyword) ||
                item._id === escapeEmpty))
        }
    }, [keyword, array])

    useEffect(() => {
        if(filtered.length === 0 && 
            array && 
            keyword && 
            escapeEmpty) {
            setFiltered(array.filter(item =>
                item._id === escapeEmpty))
        }
    }, [filtered, array])

    return filtered
}

export default useSearch
