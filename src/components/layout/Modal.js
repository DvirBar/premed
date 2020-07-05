import React from 'react'


const Modal = props => {
  const [display, setDisplay] = [props.display, props.setDisplay];

  const notDisplayed = {
    display: "none"
  };

  const displayed = {
    display: "block"
  };

  const closeModal = () => {
    setDisplay(false);
  };

    return (
        <div className="gen-modal" style={display ? displayed : notDisplayed}>
          <div className="modal-box">
            <div className="modal-header">
                <span className="modal-title">{props.title}</span>
              <span class="close-modal" onClick={() => closeModal()}>&times;</span>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
          </div>
        </div>
    )
}

export default Modal;