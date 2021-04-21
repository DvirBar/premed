import React from 'react'
import OmmitedArgItem from './OmmitedArgItem'

function OmittedArgs({ args }) {
    return (
        <div className="payload-info__omitted-args">
            <div className="payload-info__omitted-args__title payload-info__titles">
                מקצועות שהושמטו: ({args.length})
            </div>

            {args.length > 0 &&
                 <div className="payload-info__omitted-args__list">
                    {args.map(arg => 
                        <OmmitedArgItem 
                        key={arg} 
                        arg={arg} />
                    )}
                </div>
            }
           
            
        </div>
    )
}

export default OmittedArgs
