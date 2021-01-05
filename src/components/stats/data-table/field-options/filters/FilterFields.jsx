import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { getFieldFilters } from '../../../../../redux/selectors/userdata';
import { FieldOptionsContext } from '../FieldOptionsContext';
import NumFilters from './NumFilters';
import SelectFilters from './SelectFilters';

function FilterFields() {    
    const {
        field
    } = useContext(FieldOptionsContext)

    const fieldFilters = useSelector(getFieldFilters(field._id))

    const { fieldOptions, fieldType, dataType } = field

    return (
        <div className="filter-fields">
            {dataType?.value === 'num' 
            ?   <NumFilters
                min={fieldFilters?.min || ''}
                max={fieldFilters?.max || ''} />

            : fieldOptions && fieldType.value === 'select' &&
                <SelectFilters />
            }    
        </div>
    )
}

export default FilterFields
