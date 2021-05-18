import React, { useEffect, useState } from 'react'
import Alert from '../components/layout/Alert/Alert'

function NoInternet() {
    const [message, setMessage] = useState({})

    const clearMessage = () => {
        setMessage({
            ...message,
            text: ''
        })
    }

    useEffect(() => {
        window.addEventListener('online', updateOnlineStatus)
        window.addEventListener('offline', updateOnlineStatus)

        return () => {
            window.removeEventListener('online', updateOnlineStatus)
            window.removeEventListener('offline', updateOnlineStatus)
        }
    }, [])
    

    const updateOnlineStatus = event => {
        if(navigator.onLine) {
            setMessage({
                text: 'החיבור חזר',
                isError: false
            })

            setTimeout(() => {
                if(navigator.onLine) {
                    clearMessage()
                }
            }, 5000)
        }

        else {
            setMessage({
                text: 'נותקתם מהאינטרנט, חלק מהפעולות לא יעבדו.',
                isError: true
            })
        }
    }

    return <Alert
            display={message.text}
            closeAlert={clearMessage}
            isError={message.isError}
            text={message.text} />
}

export default NoInternet
