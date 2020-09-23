import React, { Fragment } from 'react';
import CalcBlock from './CalcBlock';
import MatchFormFragment from './MatchFormFragment';

function DataBlock({ fields, groups, calcs, dataVals, uni }) {

    // When groups are passed
    if(groups) {
        return (
    <Fragment>
    {groups.map(group =>   // Map top level groups
            !group.parent &&

        <div>
            <div className="groups-list">
            {groups.map(group =>  // Map child groups
                group.parent && 

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
             <div>
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
                        fieldValids={field.validators} />

                        {field.calcOutput &&
                            <CalcBlock
                            calc={field.calcOutput}
                            values={dataVals} />
                        }
                    </div>
                )}
            </div>
            }
        </Fragment>
    )
}

export default DataBlock
