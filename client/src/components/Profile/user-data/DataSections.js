import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import DataSection from './DataSection';
import useExecCalc from './hooks/useExecCalc';
import { getAllStoredCalcs } from '../../../redux/selectors/statsinputs';
import {  selectRealVals } from '../../../redux/selectors/userdata';
import useDataValidation from './data-block/useDataValidation';
import ListLayout from '../../layout/ListLayout/ListLayout';
import { GroupsContext } from './data-block/GroupsContext';

function DataSections({ paths }) {
    const {
        selPath
    } = useContext(GroupsContext)

    const storedCalcs = useSelector(getAllStoredCalcs)
    const dataVals = useSelector(selectRealVals)

    useDataValidation(storedCalcs, dataVals)

    useExecCalc()

    return (
        <ListLayout className="user-data__data-sections">
            <DataSection 
            paths={paths}
            selPath={selPath} />
        </ListLayout>
    )
}

export default DataSections
