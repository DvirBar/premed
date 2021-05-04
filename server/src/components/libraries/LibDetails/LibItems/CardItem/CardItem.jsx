import React, { Fragment, useContext, useState } from 'react'
import Card from '../../../../common/containers/Card/Card'
import ItemDetails from '../ItemDetails/ItemDetails'
import ItemFooter from '../ItemFooter/ItemFooter'
import IconObj from '../../../IconsMap';
import { LibraryContext } from '../../../LibraryContext';
import EditItem from '../../../../admin/libraries/Items/EditItem/EditItem';
import Info from '@material-ui/icons/Info'

function CardItem({ item, libId }) {
    const [display, setDisplay] = useState(false)
    const {
        isAdmin
    } = useContext(LibraryContext)

    const linkToUrl = event => {
        if(event) {
            event.stopPropagation()

            if(!isAdmin) {
                window.open(item.link, '_blank', 'noopener noreferrer') 
            }

            else {
                setDisplay(true)
            }
        }
    }

    const openDetails = event => {
        if(event) {
            event.stopPropagation()
            setDisplay(true)
        }
    }
    
    return (
        <Fragment>
            <Card
            onClick={linkToUrl}
            type="big">
                <div className="item-wrapper">
                    <p 
                    onClick={openDetails}
                    className="display-details">
                        <Info style={{fontSize: 22 }}/>
                    </p>                        
                    
                    <p className="item-name">
                        {item.name}
                    </p>
                    <img 
                    alt="file-icon"
                    className="item-icon noselect"
                    src={IconObj[item.icon]} />
                    <ItemFooter
                    libId={libId} 
                    item={item} />
                </div>
            </Card>
            {isAdmin 
            ?   <EditItem 
                display={display}
                setDisplay={setDisplay}
                item={item}
                libId={libId} />
            :   <ItemDetails
                item={item}
                display={display}
                toggleDisplay={setDisplay} />
            }
           
        </Fragment>
    )
}

export default CardItem
