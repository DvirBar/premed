import { Close } from '@material-ui/icons'
import React, { useState } from 'react'
import { Fragment } from 'react'
import { useTransition, animated } from 'react-spring'

function Alert({ display, closeAlert, isError, text }) {
    const transition = useTransition(display, {
        from: { x: '-50%', y: 20, opacity: 0},
        enter: { x: '-50%', y: 0, opacity: 1},
        leave: { x: '-50%', y: 20, opacity: 0}
    })

    return (
        <Fragment>
            {transition((style, item) => 
                item &&
                    <animated.div 
                    style={style}
                    className={`alert ${isError ? 'error' : ''}`}>
                        <div 
                        onClick={() => closeAlert()}
                        className="alert__close">
                            <Close />
                        </div>
                        <div className="alert__text">
                            {text}
                        </div>
                    </animated.div>
            )}
        </Fragment>
    )
        
}

export default Alert
