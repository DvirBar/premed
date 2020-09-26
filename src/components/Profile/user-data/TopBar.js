import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleEnabled } from '../../../redux/actions/userdata'
import ToggleSwitch from '../../common/ToggleSwitch'
import DataPathsList from './DataPathsList'

function TopBar({ data }) {
    const dispatch = useDispatch()
    const [enabled, setEnabled] = useState(false);
    const [paths, setPaths] = useState([])
    
    useEffect(() => {
        setEnabled(data.enabled)
        setPaths(data.paths)
    }, [data])

    const options = [
        {
            name: 'אל תציג',
            value: false
        },
        {
            name: 'הצג',
            value: true,
        },
    ]

    const toggleOptions = () => {
        dispatch(toggleEnabled())
    }


    return (
        <div className="top-bar">
            <div className="switch-block">
                <p className="switch-name">הצגה בטבלת הנתונים:</p>
                <ToggleSwitch
                options={options}
                onChange={toggleOptions}
                value={enabled} />
            </div>
            <DataPathsList paths={paths} />
        </div>
    )
}

export default TopBar
