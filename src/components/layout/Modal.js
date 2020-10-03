import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from '../common/useOnClickOutside';
import TopLinks from './TopLinks';

const Modal = ({ 
  display, 
  toggleModal, 
  children, 
  title, 
  subTitle, 
  linksList, 
  selectLink })=> {
    
    // We'll use ref of modal box, so when clicking outside it'll close
    const ref = useRef();
    useOnClickOutside(ref, display, () => toggleModal(false))

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

    const showOpacity = {
      opacity: 1,
      visibility: 'visible' 
    }
    
    const hideOpacity = {
      opacity: 0,
      visibility: 'hidden'
    }

    return (
        <div 
        className="gen-modal" 
        style={display ? showOpacity : hideOpacity} 
        onKeyPress={event => escapeModal(event)}>
          <div 
          className="modal-box" 
          ref={ref}>
            <p class="close-modal" onClick={() => toggleModal(false)}>&times;</p>
            <div className="modal-header">
              <p className="modal-titles">
                <span className="modal-title">{title}</span>
                <span className="modal-subtitle">{subTitle}</span>
              </p>
              {linksList && 
                <TopLinks 
                linksList={linksList}
                selectLink={selectLink} />}
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
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