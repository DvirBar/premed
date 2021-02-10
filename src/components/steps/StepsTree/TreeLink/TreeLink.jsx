import React from 'react'
import LinkLabels from './LinkLabels'
import LinkPath from './LinkPath'


function TreeLink({ nextSteps, linkWidth, color }) {
    const multiNext = nextSteps.length > 1

    const mainLinkHeight = 70
    const splitLinkHeight = 150
    const svgHeight = multiNext ? splitLinkHeight : mainLinkHeight

    const pathCords = {
        startX: 150,
        startY: 0,
        length: 70
    }
    return (
       <div className="path-section">
           <LinkLabels 
           nextSteps={nextSteps}
           color={color}
           isMulti={multiNext} />
           <LinkPath
           linkWidth={linkWidth}
           svgHeight={svgHeight}
           multiNext={multiNext}
           pathCords={pathCords}
           color={color}
           nextSteps={nextSteps} />
       </div>
    )
}

export default TreeLink
