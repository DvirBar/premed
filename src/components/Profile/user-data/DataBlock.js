import React, { Fragment } from 'react';
import CalcBlock from './CalcBlock';
import BlockContent from './data-block/BlockContent';
import MatchFormFragment from './MatchFormFragment';

function DataBlock({ tableId, fields, groups, calcs, uni }) {

    // // When groups are passed
    // if(groups) {
    //     return (
    // <Fragment>
    // {groups.map(parentGroup =>   // Map top level groups
    //         !parentGroup.parent &&

    //     <div className="data-block">
    //         <div className="block-header">
    //             <p className="block-name">בגרויות</p>
    //         </div>
    //         <div className="data-block-content group">
    //             <div className="groups-list">
    //             {groups.map(group =>  // Map child groups
    //                 group.parent === parentGroup._id && 

    //                 <div className="group-item">
    //                     <div className="group-name">
    //                         {group.name}:
    //                     </div>

    //                     {fields.map(field => 
    //                         field.group._id === group._id &&
    //                             <MatchFormFragment
    //                             title={field.name}
    //                             name={field._id}
    //                             type={field.fieldType}
    //                             defValue={dataVals.find(val => 
    //                                 val.field?._id === field._id)?.value}
    //                             fieldOptions={field.fieldOptions}
    //                             fieldValids={field.validators} />
    //                             )}
    //                 </div>
    //             )}
    //             </div>
    //         </div>
    //     </div>
    // )}
    // </Fragment>
    //     )
    // }


    return (
        <Fragment>
             <div className="data-block">
                <div className="block-header">
                    {uni 
                    ? <span>{uni.name}</span>
                    : <span>כללי</span>}
                </div>
                <BlockContent 
                fields={fields}
                calcs={calcs} />         
            </div>
        </Fragment>
    )
}

export default DataBlock
