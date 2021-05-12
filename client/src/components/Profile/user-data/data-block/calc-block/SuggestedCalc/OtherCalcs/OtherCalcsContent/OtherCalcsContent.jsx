import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { getTableYear } from '../../../../../../../../redux/selectors/userdata'
import OtherCalcsItem from '../OtherCalcsItem/OtherCalcsItem'

function OtherCalcsContent({ calc }) {
    const year = useSelector(getTableYear)
    const yearVesrsions = [year, year - 1]

    return (
        <div className="other-calcs-content">
            {calc.versions 
            ?   <p className="constant-calc">
                   שיטת חישוב הסכם משתנה בכל שנת מיונים
                </p>
            :   <p className="constant-calc">
                    שיטת חישוב הסכם לא משתנה משנה לשנה                    
                </p>
            }
            <div className="other-calcs-content__list">
                {yearVesrsions.map(calcVersion =>
                    <div
                    className="other-calcs-content__list__item"
                    key={calcVersion}>
                        <div className="other-calcs__content__version-year">
                            {calc.name} {calcVersion}
                        </div>
                        <OtherCalcsItem 
                        calc={calc}
                        year={calcVersion} />
                    </div>
                )}
            </div>
        </div>
    )    
}

export default OtherCalcsContent
