import React, { useEffect } from 'react'

function useHideScroll(disable) {
    useEffect(() => {
        /* Prevent window overflow and disable scrolling  */
        if(disable) {
            document.body.style.overflowY = 'hidden';
            document.body.scroll = "no"
        }

        /* Cleanup window overflow disable and scrolling */
        else {
            document.body.style.overflowY = 'auto';
            document.body.scroll = "yes"
        }
    }, [disable])
}

export default useHideScroll
