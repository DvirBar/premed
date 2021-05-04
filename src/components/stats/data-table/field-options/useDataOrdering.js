import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { filterData, sortData } from '../../../../redux/actions/userdata'
import { isObjEmpty } from '../../../../utils/objects'
import { FieldOptionsContext } from './FieldOptionsContext'

function useDataOrdering(toggleModal) {
    const dispatch = useDispatch()

    const {
        sort,
        field,
        minVal,
        maxVal,
        error,
        selOption
    } = useContext(FieldOptionsContext)

    const setDataOrdering = () => {
        if(!Object.values(error).find(val => val)) {
            if(maxVal !== '' || minVal !== '') {
                const filter = {
                    min: minVal,
                    max: maxVal,
                    field: {
                        id: field._id,
                        name: field.name,
                        type: 'num'
                    }
                }
    
                dispatch(filterData(filter))
            }
    
            if(!isObjEmpty(selOption)) {
                const filter = {
                    text: selOption.value,
                    field: {
                        id: field._id,
                        name: field.name,
                        type: 'str'
                    }
                }
    
                dispatch(filterData(filter))
            }
    
            if(sort) {
                dispatch(sortData(sort, field._id))
            }
            
            toggleModal(false)
        }
    }

    return setDataOrdering
}

export default useDataOrdering
