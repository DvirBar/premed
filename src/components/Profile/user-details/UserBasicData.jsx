import React from 'react'
import moment from 'moment';
import EditUser from '../EditUser';

function UserBasicData({ user }) {

    return (
        <div className="user-basic-data">
            <h1>עריכת פרטים בסיסיים</h1>
            <p className="user-date-created">
                <span>המשתמש נוצר ב-</span>
                <span>{moment(user.date_created).format('DD בMMMM, YYYY')}</span>
            </p>
            <EditUser user={user} />
        </div>
    )
}

export default UserBasicData
