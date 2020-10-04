import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFieldsByPaths } from '../../../redux/actions/datafields';
import { getGroupsByPaths } from '../../../redux/actions/datagroups';
import { getUnisByPaths } from '../../../redux/actions/universities';
import { getStoredCalcs } from '../../../redux/actions/calculations';
import NavigateDataSections from './NavigateDataSections';
import Loadbar from '../../layout/Loadbar';
import DataBlock from './DataBlock';
import TopBar from './TopBar';

function UserStats({ data }) {
    const dispatch = useDispatch();
    const [selTable, setSelTable] = useState()
    const [paths, setPaths] = useState([])
    const [selUni, setSelUni] = useState()
    const [selPath, setSelPath] = useState()
    
    // Dispatch actions to get data
    useEffect(() => {
        if(paths && paths.length !== 0) {
            dispatch(getFieldsByPaths(paths));
            dispatch(getGroupsByPaths(paths));
            dispatch(getUnisByPaths(paths))
            dispatch(getStoredCalcs())
        }
    }, [paths])

    // Set selected table
    useEffect(() => {
        setSelTable(data.tables.find(table => 
            table.table.enabled).table._id || data.tables[0].table._id)
    }, [data])

    const changeTable = table => {
        setSelTable(table.value)
    }

    // Get table paths
    useEffect(() => {
        setPaths(data.tables.find(table => 
            table.table._id === selTable)?.paths)
    }, [selTable, data])

    // Fields
    const fieldsSelector = useSelector(state => state.datafields);
    const fields = fieldsSelector.fields;
    const loadFields = fieldsSelector.loading;

    // Groups
    const groupsSelector = useSelector(state => state.datagroups);
    const groups = groupsSelector.groups;
    const loadGroups = groupsSelector.loading;

    // Universities
    const unisSelector = useSelector(state => state.unis);
    const unis = unisSelector.unis;
    const loadUnis = unisSelector.loading;

    const changeSection = (path, uni) => {
        setSelUni(uni)
        setSelPath(path)
    }

    // Filter data vals by table
    const [dataVals, setDataVals] = useState([])

    useEffect(() => {
        setDataVals(data.tables.find(table => 
            table.table._id === selTable)?.dataVals)
    }, [data, selTable])

    if(loadFields || loadGroups || loadUnis || !selTable || !paths || paths.length === 0)
        return <Loadbar />
    
    return (
        <Fragment>
            <NavigateDataSections 
            paths={paths}
            unis={unis}
            changeSection={changeSection} />

            <TopBar 
            data={data} 
            changeTable={changeTable} 
            tableId={selTable}
            paths={paths} />
                 
            <DataBlock
            fields={fields.filter(field =>
                field.university === selUni?._id && (paths.find(curPath => 
                    curPath._id === field.path) || !field.path) && !field.group)}
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

export default UserStats
