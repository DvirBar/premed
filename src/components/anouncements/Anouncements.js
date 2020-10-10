import React from 'react';
import { useSelector } from 'react-redux';
import AncItem from './AncItem';

function Anouncements() {
    const ancsSelector = useSelector(state => state.ancs);
    const { ancs, loading } = ancsSelector;


    if(ancs) { 
        return (
            <div className="anc-list">
                {ancs.map(anc =>
                    <AncItem key={anc.id} anc={anc} />)}
            </div>
        )
    }
    else {
        return  (
            <div className="anc-list">
                <p>עדיין לא פורסמו עדכונים</p>
            </div>
        )
    }
}

export default Anouncements
