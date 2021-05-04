import React, { Fragment as div, useRef, useState } from 'react'
import useOnClickOutside from '../common/useOnClickOutside';


function ChatBox({ title, children, display, toggleChatBox }) {
    const ref = useRef()

    useOnClickOutside(ref, display, () => toggleChatBox(false))

    const body = React.Children.map(children, child => 
        child.type.displayName === 'Body' ? child : null)

    const footer = React.Children.map(children, child => 
        child.type.displayName === 'Footer' ? child : null)

    return (
        <div ref={ref} className="chat-box-env">
            <i 
            className="material-icons calc-info"
            onClick={() => toggleChatBox(!display)}>
                info
            </i>
            <div 
            className={display
            ?   "chat-box display"
            :   "chat-box"}>
                <div className="chat-box-title">
                    <span className="title-main">
                        {title}
                    </span>
                </div>
                <div className="chat-box-body">
                    {body}
                </div>
                <div className="chat-box-footer">
                    {footer}
                </div>
            </div>
        </div>
    )
}

const Body = ({ className, children }) => children;
Body.displayName = 'Body';
ChatBox.Body = Body;

const Footer = ({ className, children }) => children;
Footer.displayName = 'Footer';
ChatBox.Footer = Footer;

export default ChatBox
