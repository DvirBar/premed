import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../../common/Dropdown';

function UniSelect({ pathUnis, selectUni }) {
    const [uniOptions, setUniOptions] = useState([])

    useEffect(() => {
        setUniOptions([{name: 'ללא', value: undefined},
        ...pathUnis.map(uni => ({
            name: uni.name,
            value: uni._id
        }))])
    }, [pathUnis])

    return (
        <Fragment>
            {uniOptions.length !== 0 &&
                <Dropdown
                options={uniOptions}
                defaultOption={uniOptions[0]}
                title="אוניברסיטה"
                onChange={selectUni} />
            }
        </Fragment>
    )
}

UniSelect.propTypes = {
    pathUnis: PropTypes.array.isRequired,
    selectUni: PropTypes.func.isRequired
}

export default UniSelect
