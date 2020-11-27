import React, { useEffect, Fragment } from 'react';
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

    if(loading)
        return <Loadbar />

    return (
        <Fragment>
            <DataBlock
            fields={fields}
            groups={groups}
            calcs={calcs}
            uni={selUni} />

            {/* {!selUni && 
                <DataBlock
                fields={fields.filter(field =>
                    field.group && !field.university)}
                groups={groups.filter(group => paths.find(curPath => 
                    curPath._id === group.path) || !group.path)} 
                dataVals={dataVals} />
            } */}
        </Fragment>
    )
}

export default DataSection
