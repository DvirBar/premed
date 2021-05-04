import React from 'react'
import Grid from '../../../layout/Grid/Grid';
import CardItem from './CardItem/CardItem';

function LibItemsList({ libId, items }) {
    return (
        <Grid>
            {items.map(item => 
                <CardItem
                key={item._id}
                libId={libId} 
                item={item} />
            )}
        </Grid>
    )
}

export default LibItemsList
