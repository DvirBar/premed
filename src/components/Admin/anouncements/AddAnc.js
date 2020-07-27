import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addAnc } from '../../../redux/actions/anouncements';
import Modal from '../../layout/Modal';
import Dropdown from '../../common/Dropdown';

function AddAnc(props) {
    const [display, setDisplay] = useState(false);
    const groups = props.groups;
    const loadGroups = props.loadGroups;
    const [selected, setSelected] = useState({
        name: "קבוצת פרסום",
        value: undefined
    })
    const [options, setOptions] = useState([])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addAnc)

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if(values.title && values.groupId)
            setDisabled(false);
    }, [values])


    useEffect(() => {
        setOptions(groups.map(group => ({
            name: group.name,
            value: group._id
        })))
    }, [groups])


    if(loadGroups) {
        return <p>loading...</p>
    }

    return (
        <Fragment>
            <button 
            className="info"
            onClick={() => setDisplay(true)}>פרסם</button>
            { selected &&
                <Modal display={display} setDisplay={setDisplay}>
                    <form onSubmit={handleSubmit} noValidate>
                        <input 
                        type="text"
                        name="title" 
                        placeholder="כותרת..."
                        value={values.title || ''}
                        onChange={handleChange}
                        /><br />
                        <p className="form-error">
                            {errors.title && errors.title}
                        </p><br />

                        <input 
                        type="textarea"
                        name="content" 
                        placeholder="תוכן הפרסום"
                        value={values.content || ''}
                        onChange={handleChange}
                        /><br />
                        
                        <Dropdown 
                        selected={selected}
                        setSelected={setSelected}
                        options={options}
                        name={"groupId"}
                        onChange={handleChange}
                        /><p className="form-error">
                        {errors.groupId && errors.groupId}
                        </p><br />


                        <button
                        type="submit"
                        disabled={disabled}>צור</button>
                    </form>
                </Modal>
            }
        </Fragment>
    )
}

AddAnc.propTypes = {
    ancs: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    loadAncs: PropTypes.bool.isRequired,
    loadGroups: PropTypes.bool.isRequired
}

export default AddAnc
