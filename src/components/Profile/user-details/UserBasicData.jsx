import React from 'react'
import moment from 'moment';
import EditUser from '../EditUser';
import CardContainer from '../../layout/Containers/CardContainer/CardContainer';
import CardHeader from '../../layout/Containers/CardContainer/CardHeader';
import CardTitle from '../../layout/Containers/CardContainer/CardTitle';
import CardInfo from '../../layout/Containers/CardContainer/CardInfo';
import CardContent from '../../layout/Containers/CardContainer/CardContent';

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
