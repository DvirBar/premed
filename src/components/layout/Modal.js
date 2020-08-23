import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from '../common/useOnClickOutside';

const Modal = ({ display, toggleModal, children, title, subTitle })=> {
    
    // We'll use ref of modal box, so when clicking outside it'll close
    const ref = useRef();
    useOnClickOutside(ref, () => toggleModal(false))

    // Overflow
    if(display) {
      document.documentElement.style.overflow = 'hidden';
      document.body.scroll = "no"
    }

    else {
      document.documentElement.style.overflow = 'auto';
      document.body.scroll = "yes"
    }

    const escapeModal = event => {
      if(event.key === "Escape") {
          toggleModal(false)
      }
    }

    return (
        <Fragment>
          {display && 
            <div 
            className="gen-modal" 
            onKeyPress={event => escapeModal(event)}>
              <div className="modal-box" ref={ref}>
                <div className="modal-header">
                    <span class="close-modal" onClick={() => toggleModal(false)}>&times;</span><br/>
                    <span className="modal-title">{title}</span>
                    <p className="modal-subtitle">{subTitle}</p>
                </div>
                <div className="modal-body">
                  {children}
                </div>
              </div>
            </div>
          }
        </Fragment>
    )
}

Modal.propTypes = {
  display: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  subTitle: PropTypes.string
}

export default Modal;