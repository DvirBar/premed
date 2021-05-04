import { useEffect } from 'react'
import useWindowDim from '../useWindowDim'

function useScreenAware(ref, display) {
    const {
        width: winWidth,
        height: winHeight
    } = useWindowDim()
    
    const checkOverflow = side => {
        const dimensions = ref.current.getBoundingClientRect()
        let borderLocation = dimensions[side]

        if(side === 'bottom') {
            borderLocation = winHeight - 
                (dimensions.top + ref.current.clientHeight)
        }
        
        if(side === 'right') {
            borderLocation = winWidth - 
            (dimensions.left + ref.current.clientWidth)
        }

        const elemStyle = ref.current.style
        if(borderLocation < 0) {
            elemStyle.position = "fixed"
            elemStyle[side] = 0
        }
    }

    useEffect(() => {
        if(display && ref?.current) {
            checkOverflow('top')
            checkOverflow('left')
            checkOverflow('right')
            checkOverflow('bottom')   
        }
    }, [ref, display])
}

export default useScreenAware
