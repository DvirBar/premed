import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initMessage } from '../../../redux/actions/messages'
import { getMessage } from '../../../redux/selectors/messages'
import Alert from '../Alert/Alert'

function MessageAlerts() {
    const dispatch = useDispatch()
    const message = useSelector(getMessage)
    const closeAlert = () => dispatch(initMessage())

    return (
        <Alert 
        isError={message.status >= 400}
        display={message.msg} 
        closeAlert={closeAlert}
        text={message.msg} />
    )
}

export default MessageAlerts
