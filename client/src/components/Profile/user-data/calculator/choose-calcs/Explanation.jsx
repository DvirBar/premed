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
                חלק מהשקלולים משתנים בכל שנה, המטרה של המחשבון היא להעריך את סיכויי הקבלה שלכם בהשוואה לסכמים בשנה הקודמת.
                לכן, סכמים אלו הם סכמים של שנה שעברה, מה שמאפשר השוואה בהתאם לחישוב בו חושבו הסכמים בשנה הקודמת.
            </div>
        </div>
    )
}

export default Explanation
