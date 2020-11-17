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
            <div className="block-header">
                <p className="block-name">בגרויות</p>
            </div>
            <div className="data-block-content group">
                <div className="groups-list">
                {groups.map(group =>  // Map child groups
                    group.parent === parentGroup._id && 

                    <div className="group-item">
                        <div className="group-name">
                            {group.name}:
                        </div>

                        {fields.map(field => 
                            field.group._id === group._id &&
                                <MatchFormFragment
                                title={field.name}
                                name={field._id}
                                type={field.fieldType}
                                defValue={dataVals.find(val => 
                                    val.field?._id === field._id)?.value}
                                fieldOptions={field.fieldOptions}
                                fieldValids={field.validators} />
                                )}
                    </div>
                )}
                </div>
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
                 <div className="block-header">
                    {uni 
                    ? <span>{uni.name}</span>
                    : <span>כללי</span>}
                 </div>
                <div className="data-block-content">
                    {fields.map(field => 
                        <div className="form-fragment">
                            <MatchFormFragment
                            title={field.name}
                            name={field._id}
                            type={field.fieldType}
                            defValue={dataVals.find(val => 
                                val.field?._id === field._id)?.value}
                            fieldOptions={field.fieldOptions}
                            fieldValids={field.validators}
                            disabled={field.calcOutput && !field.calcOutput.isSuggestion} />

                            {field.calcOutput &&
                                <CalcBlock
                                field={field}
                                dataVals={dataVals}
                                suggestValue={dataVals.find(val => 
                                    val.field?._id === field._id)?.suggestValue} />
                            }   
                        </div>
                    )}
                    </div>
            </div>
            }
        </Fragment>
    )
}

export default DataBlock
