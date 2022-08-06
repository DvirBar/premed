import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectTableFilterByField } from '../../../../../redux/stats/userdata/real-data/selectors';
import { FieldOptionsContext } from '../FieldOptionsContext';
import BoolFilters from './BoolFilters';
import NumFilters from './NumFilters';
import SelectFilters from './SelectFilters';

function FilterFields() {    
    const {
        field
    } = useContext(FieldOptionsContext)

    const filter = useSelector(selectTableFilterByField(field._id))

    const { fieldOptions, fieldType, dataType } = field

    let fieldFilter = <></>;

    if(dataType?.value === 'num') {
        fieldFilter = <NumFilters
        min={filter?.$gte || ''}
        max={filter?.$lte || ''} />
    }

    else if(fieldOptions && fieldType.value === 'select') {
        fieldFilter = <SelectFilters />
    }

    else if(dataType?.value === 'boolVal') {
        fieldFilter = <BoolFilters />
    }

    return (
        <div className="filter-fields">
            {fieldFilter}
            {/* {dataType?.value === 'num' 
            ?   <NumFilters
                min={filter?.$gte || ''}
                max={filter?.$lte || ''} />

            : fieldOptions && fieldType.value === 'select' &&
                <SelectFilters />
            }     */}
        </div>
    )
}

export default FilterFields
