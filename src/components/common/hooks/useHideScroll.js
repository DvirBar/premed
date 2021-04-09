import React, { useEffect } from 'react'

function useHideScroll(disable) {
    useEffect(() => {
        /* Prevent window overflow and disable scrolling  */
        if(disable) {
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no"
        }

        /* Cleanup window overflow disable and scrolling */
        else {
        document.documentElement.style.overflow = 'auto';
        document.body.scroll = "yes"
        }
    }, [disable])
}

export default useHideScroll
