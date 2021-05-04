import { Close, Done } from '@material-ui/icons'
import React from 'react'
import { Fragment } from 'react'
import { FAILURE, LOADING, SUCCESS } from '../../../redux/loader/types'
import Loadbar from '../../layout/Loadbar'

function FieldStatuses({ status }) {
    switch(status) {
        case LOADING:
            return <Loadbar small={true} />

        case SUCCESS:
            return <div className="statuses status_success">
                        <Done />
                   </div>

        case FAILURE:
            return <div className="statuses status_failure">
                        <Close />
                    </div>

        default:
            return <Fragment></Fragment>
    }
}

export default FieldStatuses
