import { CircularProgress } from '@material-ui/core'
import React from 'react'

function Loadbar({ loadfull, small, invert }) {
    const fullStyle = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '20rem',
        zIndex: '1000000'
    } 

    let size

    if(loadfull) {
        size = 60
    }

    else if(small) {
        size = 20
    }
    
    return (
        <div 
        style={loadfull ? fullStyle : {}}
        className={`loadbar-main ${invert ? 'invert' : ''}`}>
            <CircularProgress size={size || 40} />
        </div>
    )
}

export default Loadbar
