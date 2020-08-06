import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const Modal = ({ display, toggleModal, children, title })=> {
  
    return (
        <Fragment>
          {display && 
            <div className="gen-modal">
              <div className="modal-box">
                <div className="modal-header">
                    <span class="close-modal" onClick={() => toggleModal(false)}>&times;</span><br/>
                    <span className="modal-title">{title}</span>
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
  title: PropTypes.string
}

export default Modal;