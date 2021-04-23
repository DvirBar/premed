import { Help } from '@material-ui/icons'
import React, { useRef } from 'react'
import useOnClickOutside from '../../common/useOnClickOutside';

function ToolTipContent({ text, display, setDisplay }) {
    const ref = useRef();
    useOnClickOutside(ref, display, () => setDisplay(false))
    return (
        <div
        ref={ref}
        className="tool-tip-wrapper">
            <div className={`tool-tip-content ${display ? 'display' : ''}`}>
                <span>
                    {text}
                </span>
            </div>
            <div 
            onClick={() => setDisplay(!display)} 
            className="tool-tip-anchor">
                <Help />
            </div>
        </div>
       
    )
}

export default ToolTipContent
