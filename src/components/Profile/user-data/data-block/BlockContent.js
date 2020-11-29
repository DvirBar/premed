import React from 'react'
import FormFragment from './FormFragment'

function BlockContent({ fields, calcs }) {
    return (
        <div className="data-block-content">
            {fields?.map(field => 
                <FormFragment
                field={field}
                isCalc={false} />
            )}

            {calcs?.map(calc =>
                <FormFragment
                field={calc}
                isCalc={true} />
            )}
        </div>
    )
}

export default BlockContent
