import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUnisByPath } from '../../../../../redux/selectors/unis'
import Dropdown from '../../../../common/Dropdown'

function SelectUnis({ pathId, selectUni }) {
    const unis = useSelector(getUnisByPath(pathId))
    const options = [
        {
            name: "בחירה",
            value: undefined
        },
        ...unis.map(uni => ({
            name: uni.name,
            value: uni._id
        }))
    ]
    
    return (
        <Dropdown
        options={options}
        title="אוניברסיטה"
        onChange={selectUni}
        placeholder="בחירה" />
    )
}

export default SelectUnis
