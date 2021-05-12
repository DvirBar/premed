import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from '../common/useOnClickOutside';
import TopLinks from './TopLinks';
import { useLocation } from 'react-router-dom';
import { Close } from '@material-ui/icons';

const Modal = ({ 
  display, 
  toggleModal, 
  children, 
  title, 
  subTitle, 
  links,
  className })=> {
    
    /* We'll use ref of modal box, 
    so when clicking outside it'll close */
    const ref = useRef();
    useOnClickOutside(ref, display, () => toggleModal(false))

    /* Prevent window overflow and disable outside scrolling 
      when modal is open */
    if(display) {
      document.documentElement.style.overflow = 'hidden';
      document.body.scroll = "no"
    }

    /* Cleanup window overflow disable and scrolling when 
       modal closes */
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

    // Close modal when url changes 
    const location = useLocation()

    useEffect(() => {
      toggleModal(false)
    }, [location])

    const selectLink = loc => {
      if(links && links.selectLink) {
        links.selectLink(loc)
      }
    }

    return (
        <div 
        className={`gen-modal ${className ? className : ''}`} 
        style={display ? showOpacity : hideOpacity} 
        onKeyPress={event => escapeModal(event)}>
          <div 
          className="modal-box" 
          ref={ref}>
            <div className="modal-header">
              <span className="close-modal" onClick={() => toggleModal(false)}>
                  <Close />
              </span>
              <p className="modal-titles">
                <span className="modal-title">{title}</span>
                <span className="modal-subtitle">{subTitle}</span>
              </p>
              {links?.linksList && 
                <TopLinks 
                onChoose={selectLink}
                selected={links.selected}>
                    {links.linksList.map(link => 
                      <div 
                      key={link.loc}
                      id={link.loc}>
                        {link.name}
                      </div> )}
                </TopLinks>}
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