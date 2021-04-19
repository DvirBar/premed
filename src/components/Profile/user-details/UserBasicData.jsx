import React from 'react'
import moment from 'moment';
import EditUser from '../EditUser';
import CardContainer from '../../layout/CardContainer/CardContainer';
import CardHeader from '../../layout/CardContainer/CardHeader';
import CardTitle from '../../layout/CardContainer/CardTitle';
import CardInfo from '../../layout/CardContainer/CardInfo';
import CardContent from '../../layout/CardContainer/CardContent';

function UserBasicData({ user }) {
    return (
        <CardContainer>
            <CardHeader>
                <CardTitle>
                    עריכת פרטים בסיסיים
                </CardTitle>
                <CardInfo>
                    <span>המשתמש נוצר ב-</span>
                    <span>{moment(user.date_created).format('DD בMMMM, YYYY')}</span>
                </CardInfo>
            </CardHeader>
            <CardContent>
                <EditUser user={user} />    
            </CardContent>                
        </CardContainer>
    )
}

export default UserBasicData
