import React, { useState, useEffect } from 'react';
import PathList from './PathList';

function AdminDefault() {
    return (
        <div className="admin-default">
            <p className="admin-title">תמונות נושא</p>
            <div>שינוי תמונת דף הבית</div>
            <PathList />  
        </div>
    )
}

export default AdminDefault;
