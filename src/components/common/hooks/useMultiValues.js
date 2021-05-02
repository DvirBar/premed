import React, { useState } from 'react'

function useMultiValues() {
    const [values, setValues] = useState([])

    const selectValue = value => {
        if(values.includes(value)) {
            setValues(values.filter(thisValue => thisValue !== value))
        }

        else {
            setValues([...values, value])
        }
    }

    return {
        values,
        selectValue
    }
}

export default useMultiValues
