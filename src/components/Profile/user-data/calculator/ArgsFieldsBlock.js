import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUnisFields } from '../../../../redux/selectors/unis'
import FieldsList from './FieldsList'
import ParentGroups from './ParentGroups'

function ArgsFieldsBlock({ fields, simulateExecCalcs }) {

    const fieldUnis = useSelector(state => 
        getUnisFields(state.unis.unis, fields))

    return (
        <div className="args-fields-block">
           {fieldUnis.map(uni => 
                <div 
                key={uni._id}
                className="fields-list">
                    <div className="no-uni-section">
                        <div className="no-groups">
                            <FieldsList 
                            fields={fields.filter(field =>
                                !field.university && !field.group)} />                
                        </div>

                       <ParentGroups fields={fields} />
                    </div>
                </div>
            )}
            <button onClick={() => simulateExecCalcs()}>
                חישוב
            </button>
        </div>
    )
}

export default ArgsFieldsBlock
