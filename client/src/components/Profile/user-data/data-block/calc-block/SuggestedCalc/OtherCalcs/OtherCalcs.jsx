import React from 'react'
import Modal from '../../../../../../layout/Modal'
import OtherCalcsContent from './OtherCalcsContent/OtherCalcsContent'

function OtherCalcs({ calc, display, setDisplay }) {
    const title = `שקלולים נוספים - ${calc.name}`
    return (
        <Modal
        display={display}
        toggleModal={setDisplay}
        title={title}
        className="other-calcs__content">
            <OtherCalcsContent 
            calc={calc}/>
        </Modal>
    )
}

export default OtherCalcs
