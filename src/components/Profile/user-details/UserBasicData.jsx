import React from 'react'
import moment from 'moment';
import EditUser from '../EditUser';

function UserBasicData({ user }) {

    return (
        <div className="card-container user-basic-data">
            <h1 className="card-header">
                עריכת פרטים בסיסיים
            </h1>
            <div className="card-content">
                <p className="card-info">
                    <span>המשתמש נוצר ב-</span>
                    <span>{moment(user.date_created).format('DD בMMMM, YYYY')}</span>
                </p>
                <EditUser user={user} />                
            </div>
        </div>
    )
}

export default UserBasicData
