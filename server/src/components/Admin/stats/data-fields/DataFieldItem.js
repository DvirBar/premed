import React from 'react';
import PropTypes from 'prop-types';
import ValidItem from '../valids/ValidItem'

function DataFieldItem({ field }) {   
    return (
        <div className="data-field">
            <div className="field-title">
                <div className="right-title-section">
                    <span className="field-name">
                        {field.name}
                    </span>
                    <span className="field-type">
                        {field.dataType.name} &nbsp;
                        {field.fieldType.name}
                    </span>
                </div>  
            </div>
            <div className="field-body">
                <p className="valid-list-title">
                    <span>מאמתים:</span>
                    <i 
                    className="material-icons">
                        create
                    </i>
                </p>
                <div className="valid-short">
                    {field.validators?.map(valid => 
                        <ValidItem 
                        key={valid._id}
                        valid={valid}
                        />)}
                </div>
            </div>
        </div>
    )
}

DataFieldItem.propTypes = {
    field: PropTypes.object.isRequired,
}

export default DataFieldItem
