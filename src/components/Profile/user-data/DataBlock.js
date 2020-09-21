import React from 'react';
import MatchFormFragment from './MatchFormFragment';

function DataBlock({ fields, groups, calcs, dataVals, unis }) {
    console.log(fields);

    return (
        <div>
            {fields.map(field => 
                <MatchFormFragment
                title={field.name}
                name={field._id}
                type={field.fieldType}
                defValue={dataVals.find(val => 
                    val.field === field._id)?.value}
                fieldOptions={field.fieldOptions}
                fieldValids={field.validators} />
            )}
        </div>
    )
}

export default DataBlock
