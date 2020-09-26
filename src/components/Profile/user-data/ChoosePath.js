import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addUserData } from '../../../redux/actions/userdata';
import useForm from '../../../forms/useForm';
import Checkbox from '../../common/Checkbox';

function ChoosePath() {
    const [defaultValues, setDefaultValues] = useState({
        pathIds: []
    })
    const paths = useSelector(state => state.paths.paths)
    
    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addUserData, defaultValues)


    return (
        <form onSubmit={handleSubmit} className="choose-path">
            <p className="title">בחירת מסלול</p>
            <div className="options-container">
                {paths.map(path =>
                    <div 
                    key={path._id}
                    className={values.pathIds?.find(id => id === path._id)
                    ?   "path-option checked"
                    :   "path-option"}>
                        <Checkbox 
                        name="pathIds"
                        value={path._id}
                        onChange={handleChange}
                        isMulti={true}
                        />
                        <span className="path-name">
                            {path.name}
                        </span>
                    </div>                     
                )}
            </div>
            
            <p className="button-block">
                <button type="submit">
                    סיום
                </button>
            </p>
        </form>
    )
}

export default ChoosePath
