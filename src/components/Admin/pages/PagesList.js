import React from 'react';
import { useSelector } from 'react-redux';
import { getPathPages } from '../../../redux/selectors/pages';
import PageItem from './PageItem'; 

function PagesList({ selPaths }) {
    const pages = useSelector(state => 
        getPathPages(state.pages.pages, selPaths))
    return (
        <div className="pages-list">
            {pages && pages.map(page => (
                <PageItem 
                page={page}/>
            ))}
        </div>
    )
}

export default PagesList
