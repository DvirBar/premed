import React from 'react'
import FormInput from '../../../../common/FormInput'

function AddMeta({ handleChange, values, errors }) {

    const onChange = event => {
        handleChange({
            name: 'meta',
            value: {
                ...values.meta,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div>
            <FormInput
            label="קרדיט"
            type="text"
            name="credit"
            value={values.meta?.credit}
            onChange={onChange}
            error={errors.meta?.credit} />
        </div>
    )
}

export default AddMeta
