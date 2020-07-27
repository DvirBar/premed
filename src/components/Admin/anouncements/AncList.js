import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddAnc from './AddAnc';
import AncItem from './AncItem'

function AncList() {
    const [ancs, setAncs] = useState([]);

    const selAncs = useSelector(state => state.ancs)
    const loading = selAncs.loading;
    const fetchedAncs = selAncs.ancs;

    useEffect(() => { // Bind selector to local state
        setAncs(fetchedAncs);
    }, [fetchedAncs])
 

    if(loading) {
        return <p>Loading...</p>;
    }

    else {
        return (
            <div>
                <div className="anclist-admin">
                    {ancs.map(anc => (
                        <AncItem
                        key={anc._id}
                        anc={anc}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default AncList
