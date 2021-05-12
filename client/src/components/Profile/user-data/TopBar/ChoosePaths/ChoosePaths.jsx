import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPaths } from '../../../../../redux/selectors/paths'
import Checkbox from '../../../../common/Checkbox'

function ChoosePaths({ name, selPaths, onChange }) {
    const paths = useSelector(getAllPaths)

    return (
        <div className="user-data-choose-paths">
            <p className="user-data-choose-paths__title">בחירת מסלול</p>
            <div className="user-data-choose-paths__paths-list">
                {paths.map(path =>
                    <Checkbox 
                    name={name}
                    value={path._id}
                    onChange={onChange}
                    isMulti={true}
                    label={path.name}
                    checked={selPaths?.find(pathId =>
                        pathId === path._id)
                        ? true : false}/>
                )}
            </div>
        </div>
    )
}

export default ChoosePaths
