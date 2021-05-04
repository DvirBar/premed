import React, { useState } from 'react'
import AddAncForm from './AddAncForm'

function AddAnc() {
    const [display, setDisplay] = useState(false)
    
    return (
        <div>
            <button onClick={() => setDisplay(true)}>
                פרסום חדש
            </button>
            <AddAncForm
            display={display}
            setDisplay={setDisplay} />
        </div>
    )
}

export default AddAnc
