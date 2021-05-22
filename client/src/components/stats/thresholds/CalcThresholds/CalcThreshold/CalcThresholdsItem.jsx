import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { selectTableYear } from '../../../../../redux/stats/datatables/selectors'
import CalcThresholdsType from './CalcThresholdsType'

function CalcThresholdsItem({ calc, uniColor }) {
    const { tableId } = useParams()

    const year = useSelector(selectTableYear(tableId))
    const types = [
        {
            key: 'accept',
            name: 'קבלה'
        }, 
        {
            key: 'reject',
            name: 'דחייה'
        }
    ]

    const style = {
        color: uniColor,
        borderColor: uniColor
    }

    if(calc.constValue) {
        return (
            <div 
            style={style}
            className="calc-thresholds__item__const-value">
                <div className="calc-thresholds__item__const-value__label">
                    {calc.name}
                </div>
                <div 
                style={style}
                className="calc-thresholds__item__const-value__content">
                    <div className="calc-thresholds__item__const-value__content__label">
                        סכם קבוע:
                    </div>
                    <div className="calc-thresholds__item__const-value__content__value">
                        {calc.constValue}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="calc-thresholds__item">
            <div 
            style={style}
            className="calc-thresholds__item__name">
                {calc.name}
            </div>
            <div className="calc-thresholds__item__threhsolds-list">
                {types.map(type => 
                    <CalcThresholdsType
                    key={type.key}
                    type={type}
                    year={year}
                    calc={calc} />  
                )}
            </div>
        </div>
    )
}

export default CalcThresholdsItem
