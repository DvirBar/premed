import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import TopicsList from './TopicsList';


function Subpage() {
    const { path, params } = useRouteMatch()
    const { pageUrl, subpageUrl } = params;

    const page = useSelector(state => 
        state.pages.pages.find(page => page.url === pageUrl))

    const subpage = page.subpages.find(subpage => 
        subpage.url === subpageUrl)
      
    return (
        <div>
            <TopicsList subpage={subpage} />
        </div>
    )
}

export default Subpage
