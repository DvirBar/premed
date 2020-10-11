import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFields, getAllowedTypes } from '../../../redux/actions/datafields';
import { getDataGroups } from '../../../redux/actions/datagroups';
import { getCalcs, getStoredCalcs } from '../../../redux/actions/calculations';
import InlineSelect from '../../common/InlineSelect';
import AssignArgs from './calcs/AssignArgs';
import AddDataField from './data-fields/AddDataField';
import AddCalc from './calcs/AddCalc';
import AddDataGroup from './data-groups/AddDataGroup';
import UniSelect from './unis/UniSelect';
import Loadbar from '../../layout/Loadbar';
import MainList from './MainList';

function Stats() {
    // TODO: Filter basic fields to not be calc output

    const dispatch = useDispatch();
    const [selPath, setSelPath] = useState({});
    const [pathOptions, setPathOptions] = useState([]);
    // Groups filtered by path
    const [pathGroups, setPathGroups] = useState([]); 
    // Fields filtered by path
    const [pathFields, setPathFields] = useState([]); 
    // Calcs filtered by path
    const [pathCalcs, setPathCalcs] = useState([]); 
    // Filter by university
    const [selUni, setSelUni] = useState('');


    // Get types 
    useEffect(() => {
        dispatch(getAllowedTypes());
        dispatch(getDataGroups());
        dispatch(getDataFields());
        dispatch(getCalcs());
        dispatch(getStoredCalcs());
    }, [])


    // Paths
    const pathSelector = useSelector(state => state.paths);
    const paths = pathSelector.paths;
    const loadPaths = pathSelector.loading;


    // Groups
    const groups = useSelector(state => state.datagroups.groups);


    // Data Fields
    const fieldSelector = useSelector(state => state.datafields);
    const fetchedFields = fieldSelector.fields;
    const types = fieldSelector.types;
    const [fields, setFields] = useState([])

    useEffect(() => {
        setFields(fetchedFields)
    }, [fetchedFields])



    // Calcs
    const calcsSelector = useSelector(state => state.calcs);
    const fetchedCalcs = calcsSelector.calcs;
    const { storedCalcs } = calcsSelector;
    const loadCalcs = calcsSelector.loading;
    const [calcs, setCalcs] = useState(fetchedCalcs);

    //// Bind selector to local state
    useEffect(() => {
        setCalcs(fetchedCalcs)
    }, [fetchedCalcs])


    // Universities
    const unisSelector = useSelector(state => state.unis)
    const unis = unisSelector.unis;
    const loadUnis = unisSelector.loading; 

    //// Filtering unis according to selected path
    const [pathUnis, setPathUnis] = useState([]);

    useEffect(() => {
        if(!selPath.value)
            setSelUni(undefined)

        else if(unis) {
            let filtUnis = unis.filter(uni =>
                uni.paths.find(path => 
                    path._id === selPath.value))
            setPathUnis(filtUnis)
        }
    }, [selPath, unis])


    const selectOption = option => {
        setSelPath({
            name: option.name,
            value: option.value
        })
    }

    useEffect(() => {
        setPathOptions([{ name: 'כללי', value: undefined },
        ...paths.map(path => ({
            name: path.name,
            value: path._id
        }))])
    }, [paths])

    useEffect(() => {
        if(groups) {
            let filtGroups = groups.filter(field => 
                field.path === selPath.value) 
            
            setPathGroups(filtGroups)
        }

        if(calcs) {
            let filtCalcs = calcs.filter(calc => 
                calc.path === selPath.value)

            setPathCalcs(filtCalcs)
        }

        if(fields) {
            let filtFields = fields.filter(field =>
                field.path === selPath.value)
            setPathFields(filtFields)
        }
    }, [selPath, fields, groups, calcs])

    const selectUni = option => {
        setSelUni(option.value)
    }
    
    if(paths && paths.length === 0)
        return <p className="no-resource-error">יש להוסיף מסלולים תחילה</p>

    else if(!paths || loadPaths || loadUnis || loadCalcs)
        return <Loadbar />
        
    return (
        <div className="stats-admin">    
            <p className="top-bar">
                <InlineSelect
                selected={selPath}
                selectOption={selectOption}
                options={pathOptions} />

                <AssignArgs 
                storedCalcs={storedCalcs}
                fields={fields}
                groups={groups}
                calcs={calcs} />    
            </p>    

            <p className="stats-add-buttons"> 
                <AddDataField 
                path={selPath}
                types={types}
                unis={unis} /> 

                <AddDataGroup 
                path={selPath}
                groups={pathGroups} />

                <AddCalc 
                path={selPath}
                unis={pathUnis}
                storedCalcs={storedCalcs} />

                {selPath.value && unis?.length !== 0 &&
                    <UniSelect
                    pathUnis={pathUnis}
                    selectUni={selectUni} />
                }   
            </p>
    
            <MainList
            fields={pathFields}
            groups={pathGroups}
            calcs={pathCalcs}
            types={types}
            selUni={selUni} />
        </div>
    )
}

export default Stats
