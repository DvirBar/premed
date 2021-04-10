import { useEffect } from 'react'
import { useLocation } from 'react-router'

function useOnUrlChange(callback) {
    const location = useLocation()

    useEffect(() => {
        callback()
    }, [location])
}

export default useOnUrlChange
