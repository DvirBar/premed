import React, { useContext } from 'react';
import Section from '../../common/Section';
import BlockContent from './data-block/BlockContent';
import { GroupsContext } from './data-block/GroupsContext';

function DataBlock({ 
    title, 
    fields, 
    groups, 
    group, 
    calcs, 
    getChildren,
    color
}) {
    const {
        isSimulated
    } = useContext(GroupsContext)


    if(isSimulated) {
        return (
            <div className="data-block simulated">
                {title &&
                    <div className="block-header">
                        {title}
                    </div>
                }
                <BlockContent 
                 fields={fields}
                 groups={groups}
                 group={group}
                 calcs={calcs}
                 getChildren={getChildren} />
            </div>
        )
    }

    const titleStyle = {
        backgroundColor: color || "#486974",
        color: "#fff"
    }

    return (
        <Section className="section-data-block">
            <Section.Title 
            style={titleStyle} 
            className="section-block-header">
                {title}
            </Section.Title>
            
            <Section.Body>
                <BlockContent 
                fields={fields}
                groups={groups}
                group={group}
                calcs={calcs}
                getChildren={getChildren} />
            </Section.Body>
        </Section>
    )

    
}

export default DataBlock
