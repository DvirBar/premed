import React from 'react'

function Loadbar({ loadfull }) {
    const fullPage = {
        position: 'absolute'
    }

    const fullCont = {
        position: 'relative'
    }

    return (
        <div 
        className="loadbar-main"
        style={loadfull ? fullPage : fullCont}>
            <p className="loader"></p>
            
        </div>
    )
}

export default Loadbar
