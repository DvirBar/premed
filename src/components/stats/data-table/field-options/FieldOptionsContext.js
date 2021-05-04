import React, { createContext, useState } from 'react';

export const FieldOptionsContext = createContext()

const FieldOptionsProvider = ({ children, field }) => {
    const [minVal, setMinVal] = useState('')
    const [maxVal, setMaxVal] = useState('')
    const [error, setError] = useState({});
    const [selOption, setSelOption] = useState({});
    const [sort, setSort] = useState('');

    const changeMinVal = val => {
        setMinVal(val)
    }

    const changeMaxVal = val => {
        setMaxVal(val)
    }

    const changeError = error => {
        setError(error)
    }

    const selectOption = option => {
        setSelOption(option)
    }

    const changeSort = val => {
        setSort(val)
    }

    const fieldOptions = {
        field,
        minVal,
        maxVal,
        error,
        selOption,
        sort,
        changeMinVal,
        changeMaxVal,
        changeError,
        selectOption,
        changeSort
    }

    return (
        <FieldOptionsContext.Provider value={fieldOptions}>
            {children}
        </FieldOptionsContext.Provider>
    )
}

export default FieldOptionsProvider