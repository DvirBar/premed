import React, { useState, useEffect } from 'react';
import { editAnc } from '../../../redux/actions/anouncements';
import useForm from '../../../forms/useForm';
import PropTypes from 'prop-types';
import Dropdown from '../../common/Dropdown';
import Modal from '../../layout/Modal';

function EditAnc(props) {
    const groups = props.groups;
    const anc = props.anc;
    const [display, setDisplay] = [props.display, props.setDisplay]
    const [selected, setSelected] = useState({
        name: anc.group.name,
        value: anc.group._id
    })

    const defaultValues = {
        title: anc.title,
        content: anc.content,
        groupId: anc.group._id
    }

    const options = groups.map(group => ({
        name: group.name,
        value: group._id
    }))

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        initValues
    } = useForm(editAnc, defaultValues, anc._id)

    useEffect(() => { // Listen to display and init values
        initValues();
        setSelected({
            name: anc.group.name,
            value: anc.group._id
        })
    }, [display])

    return (
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
                />

                <button
                type="submit">ערוך</button>
            </form>
        </Modal>
    )
}

EditAnc.propTypes = {
    anc: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    display: PropTypes.bool.isRequired,
    setDisplay: PropTypes.func.isRequired
}

export default EditAnc
