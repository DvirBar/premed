import React from 'react'

function ColorPicker({ onChange, selColor }) {
    const colors = [
        '#002861',
        '#850303',
        '#f4921d',
        '#148991',
        '#004128',
        '#531266'
    ]

    const selectColor = colorCode => {
        const colorObj = {
            name: 'color',
            value: colorCode
        }

        onChange(colorObj)
    }


    return (
        <ul className="color-list">
            {colors.map(color => 
                <li 
                className={selColor === color
                    ? "color-item selected"
                    : "color-item"}
                style={{backgroundColor: color}}
                onClick={() => selectColor(color)}></li>)}
        </ul>
    )
}

export default ColorPicker
