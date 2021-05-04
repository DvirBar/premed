import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSort } from '../../../../redux/selectors/userdata'
import { FieldOptionsContext } from './FieldOptionsContext'

function SortFields() {
    const {
        field,
        sort,
        changeSort
    } = useContext(FieldOptionsContext)

    const sortOrdering = useSelector(getSort(field._id))

    useEffect(() => {
        changeSort(sortOrdering)
    }, [sortOrdering])

    const toggleSort = sortType => {
        if(sort === sortType)
            changeSort(undefined)

        else
            changeSort(sortType)
    }

    return (
        <div className="sort">
            <p className="sort-title">מיון:</p>
            <div className="sort-fields">
                <span 
                className={sort === 'ascending'
                ? "sort-item selected"
                : "sort-item"}
                onClick={() => toggleSort('ascending')}>
                    בסדר עולה
                </span>
                <span 
                className={sort === 'descending'
                ? "sort-item selected"
                : "sort-item"}
                onClick={() => toggleSort('descending')}>
                    בסדר יורד
                </span>
            </div>
        </div>
    )
}

export default SortFields
