import React from 'react'
import AddedArgs from './AddedArgs/AddedArgs';
import OmittedArgs from './OmittedArgs/OmittedArgs';

function PayloadInfo({ payload }) {
    return (
        <div className="payload-info">
            <AddedArgs
            units={payload.units} 
            args={payload.addedArgs} />
            <OmittedArgs args={payload.omittedArgs} />
        </div>
    )
}

export default PayloadInfo
