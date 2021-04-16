import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPaths } from '../../../redux/selectors/paths'
import Checkbox from '../../common/Checkbox'

function ChoosePaths({ values, handleChange }) {
    const paths = useSelector(getAllPaths)

    return (
        <div className="choose-paths">
            {paths.map(path => 
                <div>
                    <Checkbox 
                    label={path.name}
                    name="pathIds"
                    value={path._id}
                    onChange={handleChange}
                    isMulti={true}
                    checked={values.pathIds?.includes(path._id)
                        ? true : false}
                    />      
                </div>)}
        </div>
    )
}

export default ChoosePaths
