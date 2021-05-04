import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NestedArg from './NestedArg';
import Dropdown from '../../../common/Dropdown';

function GroupArg({ arg, fields, groupOptions, findRoleBind, 
    assignOption }) {

    const [selGroup, setSelGroup] = useState({});

    const selectGroup = group => {
        setSelGroup(group.value);
        assignOption(group);
    }

    useEffect(() => {
        const defOption = findRoleBind(arg, groupOptions);
        
        if(defOption)
            setSelGroup(defOption.value);
    }, [arg, groupOptions, findRoleBind])


    return (
        <Fragment>
            <div className={findRoleBind(arg, groupOptions)
                ? "role-block"
                : "role-block not-assigned"}>
                <span>{arg.name}</span>
                <Dropdown
                key={arg.role}
                options={groupOptions}
                defaultOption={findRoleBind(arg, groupOptions)}
                name="groupIds"
                title="קבוצת נתונים"
                onChange={selectGroup}
                placeholder="בחירה"
                uniqueListKey={arg.role} />
            </div>
                {selGroup && Object.keys(selGroup).length !== 0 &&
                <div className="nested-args">
                    {arg.fields?.map(field =>
                        <NestedArg
                        arg={field}
                        fields={fields.filter(field =>
                            field.group === selGroup)}
                        assignOption={assignOption} />
                    )}
                </div>
                }
        </Fragment>
    )
}

export default GroupArg
