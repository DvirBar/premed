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
    const paths = data.paths
    const [selUni, setSelUni] = useState()
    const [selPath, setSelPath] = useState()
    
    useEffect(() => {
        if(paths && paths.length !== 0) {
            dispatch(getFieldsByPaths(paths));
            dispatch(getGroupsByPaths(paths));
            dispatch(getUnisByPaths(paths))
            dispatch(getStoredCalcs())
        }
    }, [paths])


    // Fields
    const fieldsSelector = useSelector(state => state.datafields);
    const fetchedFields = fieldsSelector.fields;
    const loadFields = fieldsSelector.loading;
    const [fields, setFields] = useState([])

    useEffect(() => {
        setFields(fetchedFields)
    }, [fetchedFields])


    // Groups
    const groupsSelector = useSelector(state => state.datagroups);
    const fetchedGroups = groupsSelector.groups;
    const loadGroups = groupsSelector.loading;
    const [groups, setGroups] = useState([])

    useEffect(() => {
        setGroups(fetchedGroups)
    }, [fetchedGroups])


    // // Calcs
    // const calcsSelector = useSelector(state => state.calcs);
    // const fetchedCalcs = calcsSelector.calcs;
    // const loadCalcs = calcsSelector.loading;
    // const [calcs, setCalcs] = useState([])

    // useEffect(() => {
    //     setCalcs(fetchedCalcs)
    // }, [fetchedCalcs])


    // Universities
    const unisSelector = useSelector(state => state.unis);
    const fetchedUnis = unisSelector.unis;
    const loadUnis = unisSelector.loading;
    const [unis, setUnis] = useState([])

    useEffect(() => {
        setUnis(fetchedUnis)
    }, [fetchedUnis])

    const changeSection = (path, uni) => {
        setSelUni(uni)
        setSelPath(path)
    }

    if(loadFields || loadGroups || loadUnis)
        return <Loadbar />
    
    return (
        <Fragment>
            <NavigateDataSections 
            paths={paths}
            unis={unis}
            changeSection={changeSection} />

            <TopBar data={data} />

            <DataBlock
            fields={fields.filter(field =>
                field.university === selUni?._id && (paths.find(curPath => 
                    curPath._id === field.path) || !field.path) && !field.group)}
            dataVals={data.dataVals}
            uni={selUni} />

            {!selUni && 
                <DataBlock
                fields={fields.filter(field =>
                    field.group && !field.university)}
                groups={groups.filter(group => paths.find(curPath => 
                    curPath._id === group.path) || !group.path)} 
                dataVals={data.dataVals} />
            }
        </Fragment>
    )
}

export default UserStats
