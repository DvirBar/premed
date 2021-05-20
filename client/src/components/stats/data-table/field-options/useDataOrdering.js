import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getUsersDataByPathTable } from '../../../../redux/actions/userdata'
import { selectTableFilters } from '../../../../redux/stats/userdata/real-data/selectors'
import { isDeepEqual, isObjEmpty } from '../../../../utils/objects'
import { FieldOptionsContext } from './FieldOptionsContext'

function useDataOrdering(toggleModal) {
    const dispatch = useDispatch()

    const {
        field,
        minVal,
        maxVal,
        error,
        selOption
    } = useContext(FieldOptionsContext)

    const { pathId, tableId } = useParams()  
    const filters = useSelector(selectTableFilters)

    const addFilter = () => {
        if(!Object.values(error).find(val => val)) {
            let filter = {
                field: field._id,
                fieldName: field.name
            }
            // If filters are minimum and maximum (numeric)
            if(maxVal !== '' || minVal !== '') {
                filter.value = {}

                if(minVal) {    
                    filter.value = { $gte: Number(minVal)}
                }

                if(maxVal) {
                    filter.value = 
                    {
                        ...filter.value,
                        $lte:  Number(maxVal)
                    }
                }
            }
    
            // If filters are for a specific value (string)
            if(!isObjEmpty(selOption)) {
                filter.value = selOption.value
            }
            
            let found = false
            let skip = false
           
            const filtersToCommit = filters.map(thisFilter => {
                 // See if the staged filter is already applied 
                if(thisFilter.field === filter.field) {
                    found = true

                    // If found field filters hasn't changed
                    if(isDeepEqual(thisFilter.value, filter.value)) {
                        skip = true
                        toggleModal(false)
                        return thisFilter
                    }

                    return filter
                }

                return thisFilter
            })

            if(skip) {
                return
            }

            if(!found) {
                filtersToCommit.push(filter)
            }

            dispatch(getUsersDataByPathTable(tableId, pathId, filtersToCommit))
            toggleModal(false)
        }
    }

    const clearFilter = filter => {
        const lengthBefore = filters.length 

        const filtersToCommit = filters.filter(thisFilter => 
            thisFilter.field !== filter.field)
        
        if(lengthBefore !== filtersToCommit.length) {
            dispatch(getUsersDataByPathTable(tableId, pathId, filtersToCommit))
        }
    }

    const clearAllFilters = () => {
        if(filters.length > 0) {
            dispatch(getUsersDataByPathTable(tableId, pathId, []))
            toggleModal(false)
        }   
    }

    return {
        addFilter,
        clearFilter,
        clearAllFilters
    }
}

export default useDataOrdering
