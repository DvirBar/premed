import { Close } from '@material-ui/icons'
import React, { useRef } from 'react'
import CardContainer from '../CardContainer/CardContainer'

function ModalContainer({ style, display, setDisplay }) {
    const ref = useRef()
    
    return (
        <div
        className="modal-container-wrapper">
            <div className="modal-container-mask" />
            <CardContainer
            ref={ref}
            className="modal-container-content">
                <div className="modal-container-content__header">
                    <div className="modal-container-content__header__close">
                        <Close />
                    </div>
                </div>
            </CardContainer>
        </div>
    )
}

export default ModalContainer
