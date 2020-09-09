import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PathItem from './PathItem';
import AddPath from './AddPath';

function PathList({ paths }) {

    return (
        <div>
            <h2>מסלולים</h2>
            <ul className="items-list">
                {paths 
                ? (paths.map(path => (
                    <PathItem key={path.id} path={path} />
                )))
                : <li>אין עדיין מסלולים</li>}
                <AddPath />
            </ul>
        </div>
    )
}

export default PathList
