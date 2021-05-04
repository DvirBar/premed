import React, { useState } from 'react'
import AddGroupForm from './AddGroupForm'


function AddGroup() {
    const [display, setDisplay] = useState(false)
    
    return (
        <div>
            <button onClick={() => setDisplay(true)}>
                קבוצה חדשה
            </button>
            <AddGroupForm 
            display={display}
            toggleDisplay={setDisplay} />
        </div>
    )
}

export default AddGroup
