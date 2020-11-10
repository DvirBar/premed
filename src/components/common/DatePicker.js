import React, { useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FormInput from './FormInput';
import moment from 'moment';
import useOnClickOutside from './useOnClickOutside';

function DatePicker({ 
    label, 
    name, 
    value, 
    onChange, 
    error }) {

    const changeDate = date => {
        const dateObj = {
            name,
            value: date
        }

        setDisplayCal(false)

        onChange(dateObj)
    }

    const [displayCal, setDisplayCal] = useState(false)

    const ref = useRef();
    useOnClickOutside(ref, displayCal, () => setDisplayCal(false))

    const showOpacity = {
        opacity: 1,
        visibility: 'visible' 
      }
      
      const hideOpacity = {
        opacity: 0,
        visibility: 'hidden'
      } 
    
    const now = new Date()
    const minDate = new Date()
    minDate.setFullYear(now.getFullYear(), 1, 1)

    const maxDate = new Date()
    maxDate.setFullYear(now.getFullYear(), 12, 31)

    return (
        <div className="form-date-picker">
            <FormInput
            label={label} 
            type='text'
            value={moment(value).format('DD/MM/yyyy')}
            error={error}
            onClick={() => setDisplayCal(!displayCal)}
            width="10rem" />

            <div
            style={displayCal ? showOpacity : hideOpacity} 
            className="modal-wrapper">
                <div className="cal-wrapper" ref={ref}>
                    <Calendar
                    onChange={changeDate}
                    value={value}
                    calendarType="Hebrew"
                    className="calendar-float open" />   
                </div>
            </div>
        </div>
    )
}

export default DatePicker
