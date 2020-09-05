import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllowedTypes } from '../../../redux/actions/datafields';
import InlineSelect from '../../common/InlineSelect';
import AddDataField from './AddDataField';
import DataFieldsList from './DataFieldsList';

function Stats() {
    const dispatch = useDispatch();
    const [selPath, setSelPath] = useState({})
    const [pathOptions, setPathOptions] = useState([])

    useEffect(() => {
        dispatch(getAllowedTypes())
    }, [])

    const pathSelector = useSelector(state => state.paths);
    const paths = pathSelector.paths;
    const loadPaths = pathSelector.loading;

    const groups = useSelector(state => state.datagroups.groups);

    const fieldSelector = useSelector(state => state.datafields);
    const fetchedFields = fieldSelector.fields;
    const types = fieldSelector.types;

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

    if(paths && paths.length === 0)
        return <p className="no-resource-error">יש להוסיף מסלולים תחילה</p>

    else if(!paths || loadPaths)
        return <p>Loading...</p>
        
    return (
        <div>    
            <p className="select-path">
                <InlineSelect
                selected={selPath}
                selectOption={selectOption}
                options={pathOptions} />
            </p>            
            <AddDataField 
            path={selPath}
            groups={groups}
            fieldTypes={types.fieldTypes} />            

            <DataFieldsList 
            pathId={selPath.value}
            fields={fields}
            types={types} />
        </div>
    )
}

export default Stats
