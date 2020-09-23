import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFieldsByPaths } from '../../../redux/actions/datafields';
import { getGroupsByPaths } from '../../../redux/actions/datagroups';
import { getCalcsByPaths } from '../../../redux/actions/calculations';
import { getUnisByPaths } from '../../../redux/actions/universities';
import { getStoredCalcs } from '../../../redux/actions/calculations';
import Loadbar from '../../layout/Loadbar';
import DataBlock from './DataBlock';

function UserStats({ data }) {
    const dispatch = useDispatch();
    const paths = data.paths;
    
    useEffect(() => {
        if(paths && paths.length !== 0) {
            dispatch(getFieldsByPaths(paths));
            dispatch(getGroupsByPaths(paths));
            dispatch(getCalcsByPaths(paths));
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


    // Calcs
    const calcsSelector = useSelector(state => state.calcs);
    const fetchedCalcs = calcsSelector.calcs;
    const loadCalcs = calcsSelector.loading;
    const [calcs, setCalcs] = useState([])

    useEffect(() => {
        setCalcs(fetchedCalcs)
    }, [fetchedCalcs])


    // Universities
    const unisSelector = useSelector(state => state.unis);
    const fetchedUnis = unisSelector.unis;
    const loadUnis = unisSelector.loading;
    const [unis, setUnis] = useState([])

    useEffect(() => {
        setUnis(fetchedUnis)
    }, [fetchedUnis])

    if(loadFields || loadGroups || loadCalcs || loadUnis)
        return <Loadbar />
    
    return (
        <Fragment>
            <DataBlock
            fields={fields.filter(field =>
                !field.group && !field.university)} 
            dataVals={data.values} />

            <DataBlock
            fields={fields.filter(field =>
                field.group && !field.university)}
            groups={groups.filter(group =>
                !group.path)} 
            dataVals={data.values} />

            {paths.map(path => 
                unis.map(uni =>
                    uni.paths.find(curPath => curPath === path) && 
                        <DataBlock
                        fields={fields.filter(field =>
                            field.university === uni._id)}
                        dataVals={data.values}
                        uni={uni} />
                    )
                )}
        </Fragment>
    )
}

export default UserStats
