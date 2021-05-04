import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Dropdown from '../../../../common/Dropdown';
import { getCalcsByUniAndPath } from '../../../../../redux/selectors/statsinputs';

function SelectCalcs({ pathId, uniId, selectField }) {
    const calcFields = useSelector(getCalcsByUniAndPath(pathId, uniId))

    const options = [
        {
            name: "בחירה",
            value: undefined
        },
        ...calcFields.map(field => ({
            name: field.name,
            value: field._id
        }))
    ]

    useEffect(() => {
        selectField({value: undefined})
    }, [pathId, uniId])

    return (
        <Fragment>
            {options && options.length !== 0 &&
                <Dropdown
                options={options}
                title="שקלול"
                onChange={selectField}
                placeholder="בחירה" />}
        </Fragment>
    )
}

SelectCalcs.propTypes = {
    selectField: PropTypes.func.isRequired
}

export default SelectCalcs
