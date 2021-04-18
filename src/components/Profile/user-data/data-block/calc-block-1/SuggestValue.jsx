import React from 'react'

function SuggestValue({ calc, value }) {
    const suggestValText = 
    `על בסיס הנתונים שהזנת והחישובים שביצענו, השקלול הוא:`

    const disclaimer = 
    `<p>שימו לב, למרות שחישוב זה מבוסס על נתונים רישמיים
    שפורסמו על ידי האוניברסיטה, יתכנו שינויים
    בשיטת החישוב. לכן
    <b>אין להסתמך</b>
    על חישובים אלו בלבד.</p>`

    const disclaimerEstTxt =
    `<p>שימו לב, חישוב זה הוא
    <b>אינו</b>
    מבוסס על נתונים רשמיים אלא הערכה על בסיס נתוני מועמדים בלבד.
    אין להסתמך על חישוב זה.</p>`

    let disclaimerEstimated

    if(calc.credit) {
        const credit = 
        `<p>תודה ל<a href='${calc.credit.url}'>${calc.credit.name}</a>
        על ביצוע הערכת השקלול.
        </p>`

        disclaimerEstimated = disclaimerEstTxt + credit
    }

    else {
        disclaimerEstimated = disclaimerEstTxt
    }

    return (
        <div className="suggest-value">
            <div className="suggest-value-pre">
                {suggestValText}
            </div>
            <div className="suggested-value">
                <span>
                    {value} 
                </span>
            </div>
            <div 
            dangerouslySetInnerHTML={{__html: 
                calc.isEstimated 
                ? disclaimerEstimated
                : disclaimer}}
            className="suggest-value-disclaimer">
            </div>
        </div>
    )
}

export default SuggestValue
