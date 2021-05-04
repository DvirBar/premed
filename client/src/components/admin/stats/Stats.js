import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InlineSelect from '../../common/InlineSelect';
import UniSelect from './unis/UniSelect';
import Loadbar from '../../layout/Loadbar';
import MainList from './MainList';
import { getStatsInputs } from '../../../redux/actions/basedata';
import { statsInputsSelector } from '../../../redux/selectors/statsinputs';

function Stats() {
    // TODO: Filter basic fields to not be calc output

    const dispatch = useDispatch();
    const [selPath, setSelPath] = useState({});
    const [pathOptions, setPathOptions] = useState([]);
    // Groups filtered by path
    const [pathGroups, setPathGroups] = useState([]); 
    // Fields filtered by path
    const [pathFields, setPathFields] = useState([]); 
    // // Calcs filtered by path
    // const [pathCalcs, setPathCalcs] = useState([]); 
    // Filter by university
    const [selUni, setSelUni] = useState('');


    // Paths
    const pathSelector = useSelector(state => state.paths);
    const paths = pathSelector.paths;
    const loadPaths = pathSelector.loading;

    const {
        fields,
        groups,
        calcs
    } = useSelector(statsInputsSelector)

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

        if(fields) {
            let filtFields = fields.filter(field =>
                field.path === selPath.value)
            setPathFields(filtFields)
        }
    }, [selPath, fields, groups])

    const selectUni = option => {
        setSelUni(option.value)
    }

    if(!unis || loadUnis)
        return <Loadbar />
        
    return (
        <div className="stats-admin">    
            <InlineSelect
            selected={selPath}
            selectOption={selectOption}
            options={pathOptions} />  

            {selPath.value && unis?.length !== 0 &&
                <UniSelect
                pathUnis={pathUnis}
                selectUni={selectUni} />
            }   
    
            <MainList
            fields={pathFields}
            groups={pathGroups}
            selUni={selUni} />
        </div>
    )
}

export default Stats
