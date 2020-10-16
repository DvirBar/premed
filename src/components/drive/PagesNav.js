import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getPathPages } from '../../redux/selectors/pages';

function PagesNav() {
    let { params, url } = useRouteMatch();
    const { pathId, pageUrl } = params;

    const pages = useSelector(state => 
        getPathPages(state.pages.pages, [pathId]))

    const replacePageUrl = newUrl => {
        url = url.replace(pageUrl, newUrl)
    }

    return (
        <div className="pages-nav-inline">
            {pages.map(page => 
                <Link
                key={page.url}
                to={`${replacePageUrl(page.url)}`}
                className={page.url === pageUrl
                ?   "page-inline-list-item current"
                :   "page-inline-list-item"}>
                    {page.name}
                </Link>
            )}
        </div>
    )
}

export default PagesNav
