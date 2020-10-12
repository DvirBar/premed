import React, { useEffect, useState } from 'react'

function useWindowDim() {
    const [dimentions, setDimentions] = useState({
            width: window.innerWidth,
            height: window.innerHeight
        })
        
    useEffect(() => {
        const listener = event => {
            setDimentions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    
        window.addEventListener('resize', listener) 

        return () => { // Cleanup
            window.removeEventListener('resize', listener)
        }
    })

    return dimentions;
}

export default useWindowDim
