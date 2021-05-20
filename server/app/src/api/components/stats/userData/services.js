import UserData from '../../../../../models/UserData';

export const getTableDataVals = async (pathId, tableId, filters, lastId) => {
    const limit = 30
    const userdata =  await UserData.getTableDataVals(pathId, tableId, filters, lastId, limit)

    const newLastId = userdata[userdata.length - 1]?._id

    let data = userdata.map(dataItem => dataItem.tables[0].dataVals)
    let finished = false
    if(data.length < limit) {
        finished = true
    }

    return {
        data,
        finished,
        newLastId
    }
}