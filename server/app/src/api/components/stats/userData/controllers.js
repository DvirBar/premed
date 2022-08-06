import * as UserDataServices from './services'

export const getTableDataVals = async(req, res, next) => {
    const { pathId, tableId } = req.params
    const {
        filters,
        lastId
    } = req.body
    console.log(filters);
    try {
        const dataVals = await UserDataServices.getTableDataVals(pathId, tableId, filters, lastId)

        return res.status(200).send(dataVals)
    }

    catch(err) {
        next(err)
    }
}