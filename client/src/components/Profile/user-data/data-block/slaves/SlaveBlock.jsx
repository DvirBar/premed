import React, { useContext } from 'react'
import FormFragment from '../FormFragment'
import { GroupsContext } from '../GroupsContext'

function SlaveParentBlock({ parentSlave, slaves }) {
    const slavesChildren = slaves.filter(slave => 
        parentSlave.slaves.find(child => child._id === slave._id))

    const { isSimulated } = useContext(GroupsContext)
    return (
        <div className="slaves-list__block">
            <div className="slaves-list__block__parent">
                <FormFragment
                key={parentSlave._id}
                field={parentSlave}
                isCalc={false} />
            </div>
            {!isSimulated &&
                <div className="slaves-list__block__slaves">
                    {slavesChildren.map(slave => 
                        <FormFragment
                        key={slave._id}
                        field={slave}
                        isCalc={false} />)}
                </div>            
            }
        </div>
    )
}

export default SlaveParentBlock
