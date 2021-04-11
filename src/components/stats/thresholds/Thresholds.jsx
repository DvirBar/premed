import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTableById } from '../../../redux/selectors/datatables'
import { getStatsInputs } from '../../../redux/actions/basedata'
import { getUnisByPath, getUnisFields, getUnisFieldsByPath } from '../../../redux/selectors/unis'
import UniItem from './UniItem'
import ContentContainer from '../../layout/ContentContainer/ContentContainer'


function Thresholds({ pathId, tableId }) {
    const table = useSelector(getTableById(tableId))

    const unis = useSelector(getUnisByPath(pathId))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStatsInputs([pathId]))
    }, [pathId])

    return (
        <ContentContainer>
            <div className="thresholds noselect">
                <div className="unis-list">
                {unis.map(uni => 
                    <UniItem
                    key={uni._id}
                    pathId={pathId}
                    uni={uni}
                    tableId={table._id} />)}
                </div>
            </div>
        </ContentContainer>
    )
}

export default Thresholds
