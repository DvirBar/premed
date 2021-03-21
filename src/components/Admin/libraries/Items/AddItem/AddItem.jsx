import React, { useState } from 'react'
import AddItemForm from './AddItemForm'

function AddItem({ libId }) {
    const [display, setDisplay] = useState(false)
    
    return (
        <div>
            <button onClick={() => setDisplay(true)}>
                קובץ חדש
            </button>

            <AddItemForm
            libId={libId}
            display={display}
            toggleModal={setDisplay} />
        </div>
    )
}

export default AddItem
