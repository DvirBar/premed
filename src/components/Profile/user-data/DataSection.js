import React, { useEffect, Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStatsInputs } from '../../../redux/actions/basedata';
import { getFieldsByPaths } from '../../../redux/actions/datafields';
import { getGroupsByPaths } from '../../../redux/actions/datagroups';
import { getInputsByUni, statsInputsSelector } from '../../../redux/selectors/statsinputs';
import Loadbar from '../../layout/Loadbar';
import DataBlock from './DataBlock';

function DataSection({ paths, selPath, selUni }) {
    const dispatch = useDispatch()

    // Dispatch actions to get data
    useEffect(() => {
        dispatch(getStatsInputs(paths.map(path => path._id)))
    }, [paths])

    // Fields
    const {
        loading,
        fields,
        groups,
        calcs
    } = useSelector(getInputsByUni(selUni && selUni._id));

    const getChildren = group => {
        return groups.filter(thisGroup => 
            thisGroup.parent === group._id)
    }

    if(loading)
        return <Loadbar />

    return (
        <Fragment>
            <DataBlock
            title={selUni?.name || 'כללי'}
            fields={fields}
            calcs={calcs} />

            {groups &&
            groups.map(group => 
                !group.parent && 
                    <DataBlock
                    key={group._id}
                    title={group.name}
                    fields={group.fields}
                    calcs={calcs}
                    group={group}
                    groups={getChildren(group)}
                    getChildren={getChildren} />
                )
            }
        </Fragment>
    )
}

export default DataSection
