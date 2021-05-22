import React from 'react'

function TypeSelector({ types, selType, selectType }) {
    return (
        <ul className="select-thresh-type">
            {types.map((type, index) => 
                type === 'accept'
                ? <li 
                    key={index}
                    className={selType === 'accept'
                    ?   "thresh-type accept selected"
                    :   "thresh-type accept"}
                    onClick={() => selectType('accept')}>
                        קבלה
                    </li>

                : <li 
                    key={index}
                    className={selType === 'reject'
                    ?   "thresh-type reject selected"
                    :   "thresh-type reject"}
                    onClick={() => selectType('reject')}>
                        דחייה
                    </li>
            )}
        </ul>
    )
}

export default TypeSelector
