import React, { useState } from 'react'
import PathsSelector from '../../common/PathsSelector'

function Libraries() {
    const [selPath, setSelPath] = useState('')
    const selectPath = (option) => {
        setSelPath(option.value)
    }

    return (
        <div>
            <PathsSelector
            selPath={selPath}
            selectPath={selectPath} />
        </div>
    )
}

export default Libraries
