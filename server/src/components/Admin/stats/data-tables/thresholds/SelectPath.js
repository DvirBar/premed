import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InlineSelect from '../../../../common/InlineSelect';

function SelectPath({ selPath, selectPath }) {
    const paths = useSelector(state => state.paths.paths)
    const [options, setOptions] = useState([])

    useEffect(() => {
        if(paths) {
            setOptions(paths.map(path => ({
                name: path.name,
                value: path._id
            })))
        }
    }, [paths])

    useEffect(() => {
        if(options.length !== 0) {
            selectPath(options.find(option => 
                option.value === paths[0]._id))
        }
    }, [options])

    return (
        <InlineSelect
        selected={selPath}
        selectOption={selectPath}
        options={options} />
    )
}

export default SelectPath
