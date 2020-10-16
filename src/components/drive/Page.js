import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import TopicsList from './TopicsList';
import PageLinks from './PageLinks';
import { getPageByUrl } from '../../redux/selectors/pages';
import PagesNav from './PagesNav';


function Page() {
    const { params } = useRouteMatch()
    const { pageUrl } = params;

    const page = useSelector(state => 
        getPageByUrl(state.pages.pages, pageUrl))
    
    const [displayLinks, setDisplayLinks] = useState(false);

    const toggleList = () => {
        setDisplayLinks(!displayLinks)
    }

    return (
        <div className="page">
            <PagesNav />
            <PageLinks 
            links={page?.links}
            display={displayLinks} />
            <TopicsList page={page} />
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

export default Page
