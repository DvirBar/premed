import DataTableService from './service'
import messages from './messages'
import { sendHttpMessage } from '../../../services/messages'

const { 
    DataTableSuccessDelete, 
    ThresholdSuccessDelete 
} = messages

class DataTableController {
    static async getAll(req, res, next) {
        try {
            const tables = await DataTableService.getAll()

            return res.send(tables)
        }

        catch(err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const table = await DataTableService.create(req.body)

            return res.send(table)
        }

        catch(err) {
            next(err)
        }
    }

    static async edit(req, res, next) {
        try {
            const table = await DataTableService.edit(req.params.id, req.body)

            return res.send(table)
        }
        catch(err) {
            next(err)
        }
    }

    static async toggleEnabled(req, res, next) {
        try {
            const tableStatus = await DataTableService.toggleEnabled(req.params.id)

            return res.send(tableStatus)
        }

        catch(err) {
            next(err)
        }
    }

    static async addThreshold(req, res, next) {
        try {
            const threshold = await DataTableService.addThreshold(req.params.id, req.body)

            return res.send(threshold)
        }
        catch(err) {
            next(err)
        }
    }

    static async editThreshold(req, res, next) {
        const {
            id,
            threshId
        } = req.params

        const threshData = res.body

        try {
            const threshold = await DataTableService.editThreshold(id, threshId, threshData)
            return res.send(threshold)
        }
        catch(err) {
            next(err)
        }
    }

    static async removeThreshold(req, res, next) {
        const {
            id,
            threshId
        } = req.params

        try {
            await DataTableService.removeThreshold(id, threshId)
            return sendHttpMessage(res, ThresholdSuccessDelete)
        }
        catch(err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            await DataTableService.delete(req.params.id)
            return sendHttpMessage(res, DataTableSuccessDelete)
        }
        catch(err) {
            next(err)
        }
    }
}

export default DataTableController