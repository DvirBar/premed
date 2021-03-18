import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPaths } from '../../redux/selectors/paths'
import InlineSelect from './InlineSelect'

function PathsSelector({ selPath, selectPath }) {
    const paths = useSelector(getAllPaths)
    const options = paths.map(path => ({
        name: path.name,
        value: path._id
    })) 
    return (
        <div>
            <InlineSelect
            selected={selPath}
            selectOption={selectPath}
            options={options} />
        </div>
    )
}

export default PathsSelector
