import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectTableFilterByField } from '../../../../../redux/stats/userdata/real-data/selectors';
// import { getFieldFilters } from '../../../../../redux/selectors/userdata';
import { FieldOptionsContext } from '../FieldOptionsContext';
import NumFilters from './NumFilters';
import SelectFilters from './SelectFilters';

function FilterFields() {    
    const {
        field
    } = useContext(FieldOptionsContext)

    const filter = useSelector(selectTableFilterByField(field._id))

    const { fieldOptions, fieldType, dataType } = field

    return (
        <div className="filter-fields">
            {dataType?.value === 'num' 
            ?   <NumFilters
                min={filter?.$gte || ''}
                max={filter?.$lte || ''} />

            : fieldOptions && fieldType.value === 'select' &&
                <SelectFilters />
            }    
        </div>
    )
}

export default FilterFields
