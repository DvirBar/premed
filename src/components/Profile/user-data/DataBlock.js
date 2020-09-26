import React, { Fragment } from 'react';
import CalcBlock from './CalcBlock';
import MatchFormFragment from './MatchFormFragment';

function DataBlock({ fields, groups, dataVals, uni }) {

    // When groups are passed
    if(groups) {
        return (
    <Fragment>
    {groups.map(parentGroup =>   // Map top level groups
            !parentGroup.parent &&

        <div className="data-block">
            <div className="groups-list">
            {groups.map(group =>  // Map child groups
                group.parent === parentGroup._id && 

                <div className="group-item">
                    <span className="group-name">
                        {group.name}:
                    </span>

                    {fields.map(field => 
                        field.group._id === group._id &&
                            <MatchFormFragment
                            title={field.name}
                            name={field._id}
                            type={field.fieldType}
                            defValue={dataVals.find(val => 
                                val.field._id === field._id)?.value}
                            fieldOptions={field.fieldOptions}
                            fieldValids={field.validators} />
                            )}
                </div>
            )}
            </div>
        </div>
    )}
    </Fragment>
        )
    }


    return (
        <Fragment>
            {fields?.length !== 0 &&
             <div className="data-block">
                 {uni && <span>{uni.name}</span>}
                {fields.map(field => 
                    <div className="form-fragment">
                        <MatchFormFragment
                        title={field.name}
                        name={field._id}
                        type={field.fieldType}
                        defValue={dataVals.find(val => 
                            val.field._id === field._id)?.value}
                        fieldOptions={field.fieldOptions}
                        fieldValids={field.validators}
                        disabled={field.calcOutput && !field.calcOutput.isSuggestion} />

                        {field.calcOutput && field.calcOutput.isSuggestion &&
                            <CalcBlock
                            field={field}
                            dataVals={dataVals} />
                        }
                    </div>
                )}
            </div>
            }
        </Fragment>
    )
}

export default DataBlock
