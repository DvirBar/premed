import React from 'react'
import Modal from '../../layout/Modal';
import SendFPEmailForm from './SendFPEmailForm';

function SendFPEmail({ display, toggleModal }) {
  return (
    <Modal 
    display={display}
    toggleModal={toggleModal}  
    title="איפוס סיסמה">
      <div>הזינו את כתובת האימייל של המשתמש שלכם, ונשלח קישור לאיפוס הסיסמה.</div>
      <SendFPEmailForm />
    </Modal>
  )
}

export default SendFPEmail;
