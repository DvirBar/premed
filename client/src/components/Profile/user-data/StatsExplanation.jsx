import React from 'react'
import { Link } from 'react-router-dom'

function StatsExplanation({ setDisplayCalc }) {
    return (
        <div className="stats-explanation">
            <p className="stats-explanation__important-notice">
                חשוב:
            </p>
            <div className="stats-explanation__content">
                הנתונים שתזינו כאן ישמרו במסד הנתונים ויקלטו ב
                <Link to="/stats">
                    טבלת הנתונים
                </Link> (אם אישרתם להציג אותם בטבלה).

                הזינו כאן הנתונים האמיתיים שלכם <b>בלבד</b>.

                אם אתם רוצים "לשחק"
                עם המחשבונים, תוכלו לעשות זאת&nbsp;
                <span
                className="stats-explanation__content__open-calculator"
                onClick={() => setDisplayCalc(true)}>
                    כאן
                </span>.
                <p>
                    (המחשבון זמין גם באמצעות לחיצה על הכפתור בפינה הימנית התחתונה במסך).
                </p>
            </div>
            
        </div>
    )
}

export default StatsExplanation
