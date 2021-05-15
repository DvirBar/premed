import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../../../redux/actions/auth'
import Checkbox from '../../../common/Checkbox'
import DatePicker from '../../../common/DatePicker'
import FormInput from '../../../common/FormInput'

function UsersFilters({ filters, setFilters }) {
    const handleChange = useCallback(event => {
        let valueObj = event
        if(event.target) {
            valueObj = event.target
        }

        if(typeof event.persist !== "undefined")
            event.persist();
        
        const name = valueObj.name
        const value = valueObj.value

        setFilters(filters => ({
            ...filters,
            [name]: value 
        })) 
    }, [])

    const dispatch = useDispatch()

    const commitFilter = () => {
        dispatch(getUsers(filters))
    }

    return (
        <div className="users-filters-wrapper">
            <div className="users-filters">
                <FormInput
                name="firstName"
                label="שם"
                value={filters.firstName}
                onChange={handleChange} />
                
                <FormInput
                name="lastName"
                label="שם משפחה"
                value={filters.lastName}
                onChange={handleChange} />

                <DatePicker
                label="נוצר מ-"
                name="minDate"
                value={filters.minDate}
                onChange={handleChange} />

                <DatePicker
                label="נוצר עד"
                name="maxDate"
                value={filters.maxDate}
                onChange={handleChange}  />

                <Checkbox 
                name="isBlocked"
                label="חסום"
                checked={filters.isBlocked}
                onChange={handleChange} 
                />

                <button onClick={commitFilter}> 
                    סינון
                </button>
            </div>
        </div>
    )
}

export default React.memo(UsersFilters)
