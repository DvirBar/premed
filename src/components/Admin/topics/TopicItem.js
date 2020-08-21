import React, { Fragment, useState, useEffect } from 'react';
import Dropdown from '../../common/Dropdown';

function TopicItem({ siblings, topics, selTopic, selectTopic }) {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState({}) // Select locally
    const [children, setChildren] = useState([])

    useEffect(() => { // Map all siblings of to options list
        setOptions(siblings.map(sibling => ({
            name: sibling.name,
            value: sibling._id
        })))
    }, [siblings]) 

    useEffect(() => { // Init selected option when options change
        setSelected(options[0])
    }, [options])

    const selectOption = selOption => {
        setSelected(options.find(option => 
            option.value === selOption.value))

        selectTopic(siblings.find(sibling => 
            sibling._id === selOption.value))
    }

    useEffect(() => {
        if(selected)
            setChildren(topics.filter(topic => 
                topic.parent === selected.value))
    }, [selected])

    return (
        <Fragment>
            {selected &&
                <Dropdown
                selected={selected}
                options={options}
                title={"נושא"}
                onChange={selectOption}
                />
            }
            {children.length !== 0 && // Recursion base case
                <Fragment>
                    <div className="material-icons">arrow_back</div>
                    <TopicItem
                    siblings={children}
                    topics={topics}
                    selTopic={selTopic}
                    selectTopic={selectTopic} />  
                </Fragment>
            }
        </Fragment>
    )
}

export default TopicItem
