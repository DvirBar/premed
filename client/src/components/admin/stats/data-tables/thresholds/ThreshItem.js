import React, { useEffect, useState } from 'react';
import moment from 'moment';
import OptionsMenu from '../../../../common/OptionsMenu';
import EditThreshold from './EditThreshold';
import VerifyDelete from '../../../../common/VerifyDelete';
import { deleteThreshold } from '../../../../../redux/actions/datatables';

function ThreshItem({ thresh, tableId }) {
    const [displayMenu, setDisplayMenu] = useState(false)
    const [displayEdit, setDisplayEdit] = useState(false)
    const [displayDel, setDisplayDel] = useState(false)

    const toggleMenu = toggle => {
        setDisplayMenu(toggle)
    }

    const toggleEdit = toggle => {
        setDisplayEdit(toggle)
    }

    const toggleDel = toggle => {
        setDisplayDel(toggle)
    }

    const options = [
        {
            name: 'עריכה',
            action: () => setDisplayEdit(true)
        },
        {
            name: 'מחיקה',
            action: () => setDisplayDel(true) 
        }
    ]

    useEffect(() => {
        setDisplayEdit(false)
    }, [thresh])

    if(displayEdit) {
        return (
            <li>
                <EditThreshold
                tableId={tableId}
                thresh={thresh}
                toggleEdit={toggleEdit} />
            </li>
        )
    }

    return (
        <li onMouseLeave={() => toggleMenu(false)}>
            <span className="thresh-value">
                {thresh.value}
            </span>
            <span className="thresh-date">
                {moment(thresh.date).format('DD/MM/yyyy')}
            </span>
            <OptionsMenu 
            displayMenu={displayMenu}
            toggleMenu={toggleMenu}
            options={options} />

            {thresh.isFinal &&
                <span className="thresh-isfinal">
                    סופי
                </span>
            }

            <VerifyDelete
            callback={deleteThreshold}
            values={[tableId, thresh._id]}
            display={displayDel}
            toggleModal={toggleDel} />
        </li>
    )
}

export default ThreshItem
