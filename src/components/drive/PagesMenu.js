import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'
import { getPathPages } from '../../redux/selectors/pages';

function PagesMenu() {
    let { params, url } = useRouteMatch();
    const { pathId } = params;

    const pages = useSelector(state => 
        getPathPages(state.pages.pages, [pathId]))

    return (
        <div className="drive-items-grid pages-menu">
            {pages.map(page =>
                <Fragment>
                    <Link 
                    key={page.url}
                    to={`${url}/${page.url}`}
                    className="drive-grid-item page-menu-item">
                        <div className="page-name">{page.name}</div>
                        <div className="background-filter-cover"></div> 
                    </Link>
                </Fragment>
            )}
        </div>
    )
}

export default PagesMenu
