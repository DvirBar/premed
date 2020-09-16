import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InlineSelect from '../../common/InlineSelect';
import AddDataField from './AddDataField';
import DataFieldsList from './DataFieldsList';
import AddDataGroup from './AddDataGroup';
import UniSelect from './unis/UniSelect';

function Fields() {
    const [selPath, setSelPath] = useState({});
    const [pathOptions, setPathOptions] = useState([]);
    // Groups filtered by path
    const [pathGroups, setPathGroups] = useState([]); 
    // Fields filtered by path
    const [pathFields, setPathFields] = useState([]);  
    // Filter by university
    const [selUni, setSelUni] = useState('')


    // Paths
    const pathSelector = useSelector(state => state.paths);
    const paths = pathSelector.paths;
    const loadPaths = pathSelector.loading;

    // Groups
    const groups = useSelector(state => state.datagroups.groups);

    // Data Field
    const fieldSelector = useSelector(state => state.datafields);
    const fetchedFields = fieldSelector.fields;
    const types = fieldSelector.types;

    // Universities
    const unisSelector = useSelector(state => state.unis)
    const unis = unisSelector.unis;
    const loadUnis = unisSelector.loading; 

    const [fields, setFields] = useState([])

    useEffect(() => {
        setFields(fetchedFields)
    }, [fetchedFields])

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
        if(fields) {
            let filtFields = fields.filter(field =>
                field.path === selPath.value)
            setPathFields(filtFields)
        }
    }, [selPath, fields, groups])


    const selectUni = option => {
        setSelUni(option.value)
    }

    useEffect(() => {
        console.log(selUni);
    }, [selUni])
    
    if(paths && paths.length === 0)
        return <p className="no-resource-error">יש להוסיף מסלולים תחילה</p>

    else if(!paths || loadPaths || loadUnis)
        return <p>Loading...</p>
        
    return (
        <div>    
            <p className="select-path">
                <InlineSelect
                selected={selPath}
                selectOption={selectOption}
                options={pathOptions} />
            </p>    

            <p className="stats-add-buttons"> 
                <AddDataField 
                path={selPath}
                types={types}
                unis={unis} /> 

                <AddDataGroup 
                path={selPath}
                groups={pathGroups} />

                {selPath.value && unis?.length !== 0 &&
                    <UniSelect
                    selPath={selPath}
                    unis={unis}
                    selectUni={selectUni} />
                }   
            </p>
    
            <DataFieldsList 
            pathId={selPath.value}
            fields={pathFields}
            groups={pathGroups}
            types={types}
            selUni={selUni} />
        </div>
    )
}

export default Fields
