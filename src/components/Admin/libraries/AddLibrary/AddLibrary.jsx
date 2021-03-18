import React, { useState } from 'react'

function AddLibrary() {
    const [display, setDisplay] = useState(false)

    return (
        <div className="add-library">
            <button onClick={() => setDisplay(true)}>
                ספרייה חדשה
            </button>
        </div>
    )
}

export default AddLibrary
