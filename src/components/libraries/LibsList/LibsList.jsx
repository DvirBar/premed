import React, { Fragment } from 'react'
import Grid from '../../layout/Grid/Grid'
import LibItem from './LibCardItem/LibCardItem'

function LibsList({ libs, noItems }) {
    const ListContent =  libs.map(lib =>
        <LibItem
        key={lib._id}
        lib={lib}
        noItems={noItems} />
    )

    return (
        <div className="libs-list-wrapper">
            {libs.length > 0 &&
                <Fragment>
                    {noItems 
                    ? <Grid>
                         {ListContent}
                       </Grid>
                    : <div className="libs-list-has-items">
                        {ListContent}
                    </div>
                    }
                </Fragment>
                    
            }
        </div>
    )
}

export default LibsList
