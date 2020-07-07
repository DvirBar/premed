import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnc } from '../../redux/actions/anouncements';
import AncItem from './AncItem';

function Anouncements() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAnc());
    }, []);
    
    const selectedAncs = useSelector(state => state.ancs);
    const fetchedAncs = selectedAncs.ancs;

    const [ancs, setAncs] = useState(fetchedAncs);

    useEffect(() => { // Bind seletor to local state
        setAncs(fetchedAncs)
    }, [fetchedAncs])

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
