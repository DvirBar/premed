import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { clearFilters } from '../../../../../redux/actions/userdata'
import { orderingSelector } from '../../../../../redux/selectors/userdata'
import { selectTableFilters } from '../../../../../redux/stats/userdata/real-data/selectors'
import useDataOrdering from '../useDataOrdering'

function FiltersList() {
    const filters = useSelector(selectTableFilters)

    const { clearFilter } = useDataOrdering()

    return (
        <div className="filters-list">
            {filters.length === 0
            ? <p className="no-filters">
                אין מסננים
            </p>
            : filters.map(filter => 
                <span
                key={filter}
                className="filter-item">
                    <span>{filter.fieldName}</span>
                    <i className="material-icons"
                    onClick={() => clearFilter(filter)}>
                        close
                    </i>
                </span>
                )
            }
        </div>
    )
}

export default FiltersList
