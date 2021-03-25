import { useEffect } from 'react'

function useLongTouch({ ref, callback }) {
    // Touch duration in milliseconds
    const touchDuration = 500
    let timer

    function listener(exec, event) {
        if(!ref?.current || !ref.current.contains(event.target)) {
            return
        }

        exec()
    }

    function touchstart() {
        timer = setTimeout(callback, touchDuration)
    }

    function touchend() {
        if(timer) {
            clearTimeout(timer)
        }
    }

    useEffect(() => {
        document.addEventListener(
            'touchstart', 
            event => listener(touchstart, event))

        document.addEventListener(
            'touchend', 
            event => listener(touchend, event))

        // Cleanup
        return () => {
            document.removeEventListener(
                'touchstart', 
                event => listener(touchstart, event))

            document.removeEventListener(
                'touchend', event => 
                listener(touchend, event))
        }
    }, [ref, callback])
}

export default useLongTouch
