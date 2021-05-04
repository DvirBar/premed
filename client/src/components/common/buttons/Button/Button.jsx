import React, { Fragment } from 'react'
import Loadbar from '../../../layout/Loadbar'

function Button({ loading, label, type}) {
    return (
        <button 
        disabled={loading}
        type={type}>
            {loading
            ? <Loadbar small={true} />
            : <Fragment>{label}</Fragment>
            }
        </button>
    )
}

export default Button
