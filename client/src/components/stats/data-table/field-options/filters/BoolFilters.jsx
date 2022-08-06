import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Checkbox from '../../../../common/Checkbox'
import ToggleSwitch from '../../../../common/ToggleSwitch'
import { FieldOptionsContext } from '../FieldOptionsContext'
import useDataOrdering from '../useDataOrdering'

function BoolFilters() {
  const {
    selectOption,
    field
} = useContext(FieldOptionsContext)
  const [value, setValue] = useState(undefined);
  const { clearFilter } = useDataOrdering();


  const onChange = value => {
    setValue(value)

    if(!value) {
      clearFilter(field._id)
    }
    else {
      selectOption({ value })
    }
    
  }

  return (
    <Checkbox
    name={field._id}
    label={field.name}
    onChange={onChange}
    value={{on: true, off: undefined}}
    checked={value ? true : false}
    sendRaw={true} />
  )
}

export default BoolFilters
