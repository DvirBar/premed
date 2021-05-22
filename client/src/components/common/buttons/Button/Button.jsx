import React, { Fragment } from 'react'
import Loadbar from '../../../layout/Loadbar'

function Button({ 
    loading, 
    label, 
    type, 
    onClick, 
    className 
}) {

    return (
        <button 
        className={className}
        disabled={loading}
        onClick={onClick}
        type={type}>
            {loading
            ? <Loadbar small={true} />
            : <Fragment>{label}</Fragment>
            }
        </button>
    )
}

export default Button
