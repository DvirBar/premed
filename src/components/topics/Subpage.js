import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import TopicsList from './TopicsList';
import SubpageLinks from './SubpageLinks';


function Subpage() {
    const { path, params } = useRouteMatch()
    const { pageUrl, subpageUrl } = params;

    const page = useSelector(state => 
        state.pages.pages.find(page => page.url === pageUrl))

    const subpage = page.subpages.find(subpage => 
        subpage.url === subpageUrl)
    
    const [displayLinks, setDisplayLinks] = useState(false);

    const toggleList = () => {
        setDisplayLinks(!displayLinks)
    }

    useEffect(() => {
        console.log(displayLinks);
    }, [displayLinks])

    return (
        <div className="subpage">
            <SubpageLinks 
            links={subpage.links}
            display={displayLinks} />
            <TopicsList subpage={subpage} />
            <span 
            className="links-list-mobile"
            onClick={() => toggleList()}>
                <i className="material-icons">
                    link
                </i>
            </span>
        </div>
    )
}

export default Subpage
