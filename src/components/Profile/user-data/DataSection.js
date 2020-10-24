import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFieldsByPaths } from '../../../redux/actions/datafields';
import { getGroupsByPaths } from '../../../redux/actions/datagroups';
import Loadbar from '../../layout/Loadbar';

import DataBlock from './DataBlock';

function DataSection({ dataVals, paths, selPath, selUni }) {
    const dispatch = useDispatch()

    // Dispatch actions to get data
    useEffect(() => {
        if(paths && paths.length !== 0) {
            dispatch(getFieldsByPaths(paths));
            dispatch(getGroupsByPaths(paths));
        }
    }, [paths])

    // Fields
    const fieldsSelector = useSelector(state => state.datafields);
    const fields = fieldsSelector.fields;
    const loadFields = fieldsSelector.loading;

    // Groups
    const groupsSelector = useSelector(state => state.datagroups);
    const groups = groupsSelector.groups;
    const loadGroups = groupsSelector.loading;

    if(loadFields || loadGroups)
        return <Loadbar />

    return (
        <Fragment>
            <DataBlock
            fields={fields.filter(field =>
                (selUni 
                ? field.university === selUni._id 
                    && field.path === selPath?._id 
                : !field.university ) && !field.group)}
            dataVals={dataVals}
            uni={selUni} />

            {!selUni && 
                <DataBlock
                fields={fields.filter(field =>
                    field.group && !field.university)}
                groups={groups.filter(group => paths.find(curPath => 
                    curPath._id === group.path) || !group.path)} 
                dataVals={dataVals} />
            }
        </Fragment>
    )
}

export default DataSection
