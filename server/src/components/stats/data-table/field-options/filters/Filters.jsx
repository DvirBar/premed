import React from 'react'
import { useDispatch } from 'react-redux'
import { clearFilters } from '../../../../../redux/actions/userdata'
import FilterFields from './FilterFields'
import FiltersList from './FiltersList'

function Filters() {
    const dispatch = useDispatch()

    const clearAllFilters = () => {
        dispatch(clearFilters())
    }

    return (
        <div className="filters">
        <p className="filters-title">סינון:</p>
        <FiltersList />
        <p 
        className="clear-all"
        onClick={() => clearAllFilters()}>איפוס סינון</p>
        <FilterFields />
    </div>

    )
}

export default Filters
