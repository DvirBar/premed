import React, { Fragment, useState, useEffect } from 'react';
import Dropdown from '../../common/Dropdown';

function TopicItem({ siblings, topics, selTopic, selectTopic }) {
    const [options, setOptions] = useState([])
    const [children, setChildren] = useState([])

    useEffect(() => { // Map all siblings of topic options list
        setOptions(siblings.map(sibling => ({
            name: sibling.name,
            value: sibling._id
        })))
    }, [siblings]) 

    const selectOption = selOption => {
        let option = siblings.find(sibling => 
            sibling._id === selOption.value)
        selectTopic(option)

        setChildren(topics.filter(topic => 
            topic.parent === selOption.value))
    }

    return (
        <Fragment>
            <Dropdown
            options={options}
            title={"נושא"}
            placeholder="בחירה"
            onChange={selectOption}
            />
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
