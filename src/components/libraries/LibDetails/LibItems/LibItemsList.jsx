import React, { Fragment, useState } from 'react'
import Card from '../../../common/containers/Card/Card';
import Grid from '../../../layout/Grid/Grid';
import ItemDetails from './ItemDetails/ItemDetails';
import IconObj from '../../IconsMap';
import ItemFooter from './ItemFooter/ItemFooter';

function LibItemsList({ libId, items }) {
    const [display, setDisplay] = useState(false)
    
    return (
        <Grid>
            {items.map(item => 
                <Fragment>
                    <Card
                    key={item.key}
                    onClick={() => setDisplay(true)}
                    type="big">
                        <div className="item-wrapper">
                            <p className="item-name">
                                {item.name}
                            </p>
                            <img 
                            className="item-icon"
                            src={IconObj[item.icon]} />
                            <ItemFooter
                            libId={libId} 
                            item={item} />
                        </div>
                    </Card>
                    <ItemDetails
                    item={item}
                    display={display}
                    toggleDisplay={setDisplay} />
                </Fragment>
            )}
        </Grid>
    )
}

export default LibItemsList
