import React, { useState } from 'react'
import AddLibraryForm from './AddLibraryForm'

function AddLibrary() {
    const [display, setDisplay] = useState(false)
    const toggleDisplay = toggle => {
        setDisplay(toggle)
    }
    return ( 
        <div className="add-library">
            <button onClick={() => setDisplay(true)}>
                ספרייה חדשה
            </button>

            <AddLibraryForm 
            display={display}
            toggleDisplay={toggleDisplay} />
        </div>
    )
}

export default AddLibrary
