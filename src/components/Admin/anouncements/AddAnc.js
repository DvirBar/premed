import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addAnc } from '../../../redux/actions/anouncements';
import Modal from '../../layout/Modal';
import Dropdown from '../../common/Dropdown';
import FormInput from '../../common/FormInput';

function AddAnc(props) {
    const [defaultValues, setDefaultValues] = useState({})
    const [displayModal, setDisplayModal] = useState(false);
    const groups = props.groups;
    const loadGroups = props.loadGroups;
    const [selected, setSelected] = useState({})
    const [options, setOptions] = useState([])

    useEffect(() => {
        setDefaultValues({
            title: '',
            content: '',
            groupId: undefined
        })
    }, [])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addAnc, defaultValues)

    useEffect(() => {
        setOptions(groups.map(group => ({
            name: group.name,
            value: group._id
        })))
    }, [groups])

    const changeSelected = (event, selectedName) => {
        handleChange(event);
        setSelected({name: selectedName, value: event.target.value})
    }

    const toggleModal = open => {
        setDisplayModal(open)
    }

    if(loadGroups) {
        return <p>loading...</p>
    }

    return (
        <Fragment>
            <button 
            className="info"
            onClick={() => toggleModal(true)}>פרסם</button>
            { selected &&
                <Modal 
                display={displayModal} 
                toggleModal={toggleModal}
                title="פרסום חדש">
                    <form onSubmit={handleSubmit} noValidate>

                        <FormInput
                        type="text"
                        label="כותרת"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        error={errors.title} />

                        <FormInput
                        type="textarea"
                        label="תוכן הפרסום"
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        error={errors.content} />
                        
                        <Dropdown 
                        selected={selected}
                        options={options}
                        name={"groupId"}
                        title={"קבוצת פרסום"}
                        onChange={changeSelected}
                        id={"new-ancgroup"}
                        /><p className="form-error">
                        {errors.groupId && errors.groupId}
                        </p><br />

                        <button type="submit">צור</button>
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
