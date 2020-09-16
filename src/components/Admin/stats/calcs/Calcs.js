import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalcs, getStoredCalcs } from '../../../../redux/actions/calculations';
import InlineSelect from '../../../common/InlineSelect';
import UniSelect from '../unis/UniSelect';
import AddCalc from './AddCalc';
import AssignArgs from './AssignArgs';
import CalcsList from './CalcsList';

function Calcs() {
    // Get calculations
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCalcs());
        dispatch(getStoredCalcs());
    }, [])

    // Paths
    const pathsSelector = useSelector(state => state.paths)
    const { paths } = pathsSelector;
    const loadPaths = pathsSelector.loading;
    const [pathOptions, setPathOptions] = useState([])
    const [selPath, setSelPath] = useState({})

    useEffect(() => {
        setPathOptions([{ name: 'כללי', value: undefined },
        ...paths.map(path => ({
            name: path.name,
            value: path._id
        }))])
    }, [paths])

    const selectPathOption = option => {
        setSelPath({
            name: option.name,
            value: option.value
        })
    }


    // Select calcs
    const calcsSelector = useSelector(state => state.calcs);
    const fetchedCalcs = calcsSelector.calcs;
    const { storedCalcs } = calcsSelector;
    const loadCalcs = calcsSelector.loading;
    const [calcs, setCalcs] = useState(fetchedCalcs);

    // Bind selector to local state
    useEffect(() => {
        setCalcs(fetchedCalcs)
    }, [fetchedCalcs])


    // Fields
    const fieldsSelector = useSelector(state => state.datafields);
    const { fields } = fieldsSelector;
    const loadFields = fieldsSelector.loading;


    // Groups
    const groupsSelector = useSelector(state => state.datagroups);
    const { groups } = groupsSelector;
    const loadGroups = groupsSelector.loading;

    // Universities
    const unisSelector = useSelector(state => state.unis);
    const { unis } = unisSelector;
    const loadUnis = unisSelector.loading;
    const [pathUnis, setPathUnis] = useState([])
    const [selUni, setSelUni] = useState({})

    const selectUni = option => {
        setSelUni(option.value)
    }

    // Filter fields, groups and unis according to path
    useEffect(() => {
        if(unis) {
            let filtUnis = unis.filter(uni =>
                uni.paths.find(path => 
                    path._id === selPath.value))
            setPathUnis(filtUnis)
        }
    }, [selPath, unis])


    if(loadCalcs || loadPaths || loadFields || loadGroups || loadUnis)
        return <p>Loading...</p>

    if(paths.length === 0)
        return <p>יש להוסיף מסלולים תחילה</p>

    return (
        <div>
            <div className="top-bar">
                <InlineSelect
                selected={selPath}
                selectOption={selectPathOption}
                options={pathOptions} />
                <AssignArgs 
                storedCalcs={storedCalcs}
                fields={fields}
                groups={groups}
                calcs={calcs} />
            </div>
            <div className="middle-bar">
                <AddCalc 
                path={selPath}
                unis={pathUnis}
                storedCalcs={storedCalcs} />
                
                {selPath.value && unis?.length !== 0 &&
                    <UniSelect
                    selPath={selPath}
                    unis={unis}
                    selectUni={selectUni} />
                }  
            </div>

            <CalcsList
            pathId={selPath.value}
            calcs={calcs}
            fields={fields}
            uniId={selUni} />
        </div>
    )
}

export default Calcs
