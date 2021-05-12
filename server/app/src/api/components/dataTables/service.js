import DataTable from './db/model'

class DataTableService {
    static getAll() {
        return DataTable.getAll()
    }

    static create(data) {
        return DataTable.createTable(data)
    }

    static edit(tableId, data) {
        return DataTable.editTable(tableId, data)
    }

    static async toggleEnabled(tableId) {
        const table = await DataTable.toggleEnabled(tableId)

        return {
            enabled: table.enabled
        }
    }

    static async addThreshold(tableId, threshData) {
        const table = await DataTable.addThreshold(tableId, threshData)

        return table.thresholds[table.thresholds.length - 1]
    }

    static editThreshold(tableId, threshId, threshData) {
        return DataTable.editThreshold(tableId, threshId, threshData)
    }

    static removeThreshold(tableId, threshId) {
        return DataTable.removeThreshold(tableId, threshId)
    }

    static delete(id) {
        return DataTable.deleteTable(id)
    }
}

export default DataTableService