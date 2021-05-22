import React from 'react'

function Explanation() {
    return (
        <div className="calculator-explanation">
            <div className="calculator-explanation__title">
                מה זה המחשבון?
            </div>
            <div className="calculator-explanation__body">
                המחשבון מאפשר לכם "לשחק" עם הסכמים ללא שמירת הנתונים שאתם מזינים.
            </div>
            <div className="calculator-explanation__title">
                למה חלק מהסכמים הם משנה קודמת?
            </div>
            <div className="calculator-explanation__body">
                <p>
                    חלק מהשקלולים משתנים בכל שנה ומשום שהם מבוססים על נתוני המועמדים שנרשמים,
                    הם מפורסמים/נשלחים למועמדים רק מאוחר יותר במהלך השנה.
                    כל עוד אין שום מידע על שיטת חישוב הסכם, יופיע שקלול של שנה שעברה.
                </p>
                <p>
                    ככל שיעודכן השקלול, אנו נעדכן אותו באתר והשקלול העדכני יופיע במחשבון. בכל מקרה, שימו לב כי אתם יכולים ללחוץ על תוצאת השקלול ולקבל מידע נוסף על סכמי הקבלה בהתאם לאותה שנה.
                </p>
            </div>
        </div>
    )
}

export default Explanation
