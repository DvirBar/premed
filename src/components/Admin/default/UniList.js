import React from 'react';
import UniItem from './UniItem';

function UniList({ unis, paths }) {
    return (
        <ul className="items-list">
            {unis.length !== 0 
            ? (unis.map(uni => (
                <UniItem 
                key={uni.id} 
                uni={uni}
                paths={paths} />
            )))
            : <li>עדיין אין אוניברסיטאות</li>}
        </ul>
    )
}

export default UniList
