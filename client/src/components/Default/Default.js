import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPaths } from '../../redux/selectors/paths';
import Announcements from '../announcements/Announcements';
import ContentContainer from '../layout/Containers/ContentContainer/ContentContainer';
import Grid from '../layout/Grid/Grid';
import Calculator from './Illustrations/Calculator';
import Education from './Illustrations/Education';
import VersionControl from './Illustrations/VersionControl';
import VisualData from './Illustrations/VisualData';

function Default() {
    const paths = useSelector(getAllPaths)

    return (
        <ContentContainer>
             <Announcements />
             <Grid 
             className="welcome-block">
                <div className="welcome-block__item">
                    <div className="welcome-block__item__title">
                            למדו על תהליך הקבלה
                    </div>
                    <div className="welcome-block__item__image">
                        <div className="welcome-block__item__image__content">
                            <VersionControl />
                        </div>
                    </div>
                    <div className="welcome-block__item__body">
                        מועמדים חדשים?&nbsp;
                        <Link 
                        className="welcome-block__item__body__link" 
                        to={`/steps/${paths[0]?._id}`}>
                            קראו על שלבי הקבלה&nbsp; 
                        </Link>
                        של המסלולים השונים.
                    </div>
                </div>
                 <div className="welcome-block__item">
                        <div className="welcome-block__item__title">
                            חשבו את הנתונים שלכם
                        </div>
                        <div className="welcome-block__item__image">
                            <div className="welcome-block__item__image__content">
                                <Calculator />
                            </div>
                        </div>
                        <div className="welcome-block__item__body">
                            <div>   
                                תוכלו לחשב את כל נתוני הקבלה שלכם בקלות ובמהירות&nbsp;
                                <Link 
                                className="welcome-block__item__body__link" 
                                to="/profile/userdata">
                                באיזור האישי
                                </Link>.&nbsp;
                            </div>
                        </div>                    
                 </div>
                 <div className="welcome-block__item">
                    <div className="welcome-block__item__title">
                        צפו בטבלת המועמדים ובסיפי הקבלה
                    </div>
                    <div className="welcome-block__item__image">
                        <div className="welcome-block__item__image__content">
                            <VisualData />
                        </div>
                     </div>
                    <div className="welcome-block__item__body">
                        בהסכמת כל מועמד, מוצגים הנתונים שלו&nbsp;
                        <Link 
                        className="welcome-block__item__body__link" 
                        to="/stats">
                            בטבלת המועמדים
                        </Link>.&nbsp;
                        בצורה אנונימית לחלוטין. כך כל מועמד יכול להעריך את מצבו.&nbsp;
                    </div>
                </div>
                <div className="welcome-block__item">
                    <div className="welcome-block__item__title">
                        צפו בחומרי לימוד ודרגו אותם
                    </div>
                    <div className="welcome-block__item__image">
                        <div className="welcome-block__item__image__content">
                            <Education />
                        </div>
                     </div>
                    <div className="welcome-block__item__body">
                        זוכרים את הדרייב? עזבו, כל חומרי הלימוד מרוכזים&nbsp;
                        <Link 
                        className="welcome-block__item__body__link" 
                        to={`library/${paths[0]?._id}`}>
                            בספרייה
                        </Link>.&nbsp;
                        אתם יכולים לדרג חומרי לימוד ולהגיב עליהם.&nbsp;
                    </div>
                </div>
             </Grid>
        </ContentContainer>
           
    )
}

export default Default
