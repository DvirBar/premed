import React, { Fragment } from 'react'
import DisplayGroupName from './DisplayGroupName'

function AddedArgs({ args, units }) {
    const tableCols = [
        {
            key: "name",
            name: 'מקצוע'
        },
        {
            key: "units",
            name: "יח'"
        },
        {
            key: "bonus",
            name: "בונוס"
        },
        {
            key: "grade",
            name: "ציון"
        }
    ]
    
    return (
        <div className="payload-info__added-args">
            <div className="payload-info__added-args__title payload-info__titles">
                מקצועות שנכללו בחישוב:
            </div>
            <table 
            cellSpacing="0" cellPadding="0"
            className="payload-info__added-args__table">
                <tr>
                    {tableCols.map(col => 
                        <th key={col.key}>
                            {col.name}
                        </th>  
                    )}
                </tr>
                {args.map(argRow => 
                    <tr 
                    key={argRow.name}>
                        {tableCols.map(col =>
                            <Fragment>
                                 {col.key === "name"
                                    ?   <DisplayGroupName 
                                        key={col.key}
                                        argValue={argRow[col.key]} />

                                    :   <td key={col.key}>
                                            {argRow[col.key]}
                                        </td>
                                    } 
                            </Fragment>           
                        )}
                    </tr>  
                )}
            </table>
            <div className="payload-info__added-args__units-sum">
                <div>
                    {`סך כל יחידות הלימוד שנכללו: ${units}`}                
                </div>
                <div>
                    {`מספר המקצועות שנכללו: ${args.length}`}                
                </div>
            </div>
        </div>
        
    )
}

export default AddedArgs
