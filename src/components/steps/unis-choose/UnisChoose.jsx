import React from 'react';
import UniItem from './UniItem';

function UnisChoose({ unis, selectUni, selUnis }) {

    return (
        <div className="unis-choose noselect">
            {unis.map(uni => 
                <UniItem
                key={uni._id}
                uni={uni}
                selUnis={selUnis}
                selectUni={selectUni} /> 
                )}
        </div>
    )
}

export default UnisChoose
