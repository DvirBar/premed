import React, { useState } from 'react'
import useForm from '../../../../forms/useForm'
import { addUserData } from '../../../../redux/actions/userdata'
import ChooseBaseDataForm from './ChooseBaseDataForm'

function ChooseBaseData() {
    const [defaultValues] = useState({
        pathIds: []
    })

    const {
        handleChange,
        handleSubmit,
        values,
    } = useForm(addUserData, defaultValues)

    const changeEnabled = value => {
        handleChange({
            name: "enabled",
            value
        })
    }

    const isSubmitEnabled = 
        typeof values.enabled !== 'undefined' 
        && values.pathIds.length > 0
    
    return (
        <div 
        className="choose-base-data">
            <div className="choose-base-data__description">
                <div className="choose-base-data__description__title">
                    מה זה?
                </div>
                <div className="choose-base-data__description__text">
                    <div>
                        כאן תוכלו למלא את הנתונים שלכם,
                        ולחשב בקלות ובמהירות את כל הסכמים וממוצעי הבגרות (כרגע החישובים זמינים למסלול השש שנתי בלבד ובקרוב מאוד יהיו זמינים גם לשש שנתי).
                    </div>
                    <div>
                        בכל שנה, אנחנו מרכזים טבלה עם נתוני המועמדים על מנת שתוכלו להעריך את סיכויי הקבלה שלכם בשנה זו ובהשוואה לשנים קודמות.
                    </div>
                    <div>
                        מקורם של הנתונים בטבלה הוא בנתונים שתזינו באיזור האישי - 
                        <b>
                            באפשרותכם לבחור אם הנתונים
                            שלכם יוצגו בטבלה או לא.
                        </b>     
                    </div>
                    <div>
                        <b>שימו לב - </b> הנתונים המוצגים בטבלה מוצגים בצורה אנונימית לחלוטין, ולמועמדים אחרים אין יכולת לדעת למי שייכים הנתונים.
                    </div>
                </div>
            </div>
            <ChooseBaseDataForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            changeEnabled={changeEnabled}
            isSubmitEnabled={isSubmitEnabled} />
            
        </div>
    )
}

export default ChooseBaseData
