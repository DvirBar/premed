import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilters } from '../../../../../redux/actions/userdata'
import { orderingSelector } from '../../../../../redux/selectors/userdata'

function FiltersList() {
    const dispatch = useDispatch()
    const ordering = useSelector(orderingSelector)

    const clearFilter = fieldId => {
        dispatch(clearFilters(fieldId))
    }

    return (
        <div className="filters-list">
            {ordering.filters.length === 0
            ? <p className="no-filters">
                אין מסננים
            </p>
            : ordering.filters.map(filter => 
                <span
                key={filter.field.id}
                className="filter-item">
                    <span>{filter.field.name}</span>
                    <i className="material-icons"
                    onClick={() => clearFilter(filter.field.id)}>
                        close
                    </i>
                </span>
                )
            }
        </div>
    )
}

export default FiltersList
