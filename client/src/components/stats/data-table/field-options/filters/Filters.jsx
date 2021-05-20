import React from 'react'
import useDataOrdering from '../useDataOrdering'
import FilterFields from './FilterFields'
import FiltersList from './FiltersList'

function Filters({ toggleModal }) {
    const {
        clearAllFilters
    } = useDataOrdering(toggleModal)
    return (
        <div className="filters">
        <p className="filters-title">סינון:</p>
        <FiltersList />
        <p 
        onClick={() => clearAllFilters()}
        className="clear-all">איפוס סינון</p>
        <FilterFields />
    </div>

    )
}

export default Filters
