import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { getInputsByUniAndPath } from '../../../redux/selectors/statsinputs';
import DataBlock from './DataBlock';
import SectionProvider from './SectionContext';

function DataGroup({ uni, pathId }) {
    const {
        fields,
        groups,
        calcs
    } = useSelector(getInputsByUniAndPath(
        uni && uni._id, pathId));

    const getChildren = group => {
        return groups.filter(thisGroup => 
            thisGroup.parent === group._id)
    }
        
    return (
        <SectionProvider uni={uni}>
            <DataBlock
            color={uni?.color}
            title={uni?.name || 'כללי'}
            fields={fields}
            calcs={calcs} />

            {groups &&
            groups.map(group => 
                !group.parent && 
                    <DataBlock
                    key={group._id}
                    color={uni?.color}
                    title={group.name}
                    fields={group.fields}
                    calcs={calcs}
                    group={group}
                    groups={getChildren(group)}
                    getChildren={getChildren} />
                )
            }
        </SectionProvider>
    )
}

export default DataGroup
