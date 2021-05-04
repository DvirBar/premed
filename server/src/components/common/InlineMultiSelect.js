import React, { useState, useEffect } from 'react';

function InlineMultiSelect({ children, className, onChange, NotEmpty }) {
    const [itemClass, setItemClass] = useState('')
    const items = React.Children.map(children, child => 
        child.type.displayName === 'Item' ? child : null)

    useEffect(() => {
        if(items[0]?.props.className) {
            setItemClass(items[0].props.className)
        }
    }, [items]) 

    const [selItemsIds, setSelItemsIds] = useState([])
    const [isChanging, setIsChanging] = useState(true)

    useEffect(() => {
        if(isChanging) {
            const filtItems = items.filter(item => 
                item.props.selected).map(item => item.props.id)
    
            setSelItemsIds(filtItems)
            setIsChanging(false)
        }
    }, [items])

    const selectItem = item => {
        const itemId = item.props.id;

        if(!selItemsIds.find(selItemId => 
            selItemId === itemId)) {
            onChange([...selItemsIds, itemId])
        }

        else if(NotEmpty && selItemsIds.length > 1 || !NotEmpty) { 
            onChange(selItemsIds.filter(selItemId =>
                selItemId !== itemId))
        }

        setIsChanging(true)
    }

    useEffect(() => {
        console.log(selItemsIds);
    }, [selItemsIds])

    return (
        <div className={className
        ?   `inline-multi-select ${className}`
        :   'inline-multi-select'}>
            {items.map(item => 
                <div className={itemClass
                ?   item.props.selected 
                    ?   `multi-select-item ${itemClass} selected` 
                    :   `multi-select-item ${itemClass}`
                :   item.props.selected
                    ?   'multi-select-item selected'
                    :   'multi-select-item'}
                
                onClick={() => selectItem(item)}>
                    {item} 
                </div>
                )}
        </div>
    )
}

const Item = ({ className, id, selected, children }) => children;
Item.displayName = 'Item';
InlineMultiSelect.Item = Item;

export default InlineMultiSelect
