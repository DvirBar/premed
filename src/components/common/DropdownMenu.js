import React, { Fragment } from 'react';

function DropdownMenu(props) {
    const [show, setShow] = [props.show, props.setShow]

    return (
        <Fragment>
            {show &&
                <ul 
                className="dropdown-menu"
                onBlur={() => setShow(false)}
                >
                    {props.children}
                </ul>
            }
        </Fragment>
    )
}

export default DropdownMenu;