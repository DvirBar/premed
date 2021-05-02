import React, { useContext } from 'react'
import Dropdown from '../../../../common/Dropdown'
import { FieldOptionsContext } from '../FieldOptionsContext'

function SelectFilters() {
    const {
        field,
        selectOption
    } = useContext(FieldOptionsContext)

    const { fieldOptions } = field  
    
    return (
        <Dropdown
        options={fieldOptions}
        title="סינון לפי"
        onChange={selectOption}
        placeholder="בחירה" />
    )
}

export default SelectFilters
