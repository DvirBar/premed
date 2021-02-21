/* Helper function: will try to find required 
document and throw error if not found */ 
export async function findByIdRequired(model, id) {
    const doc = await model.findById(id)

    if(!doc) {
        throw "Could not find requested table"
    }

    return doc
}

export function getAll() {
    this.find().sort({ date_created: -1 })
}

export function createTable(name, url) {
    const newTable = new this({
        name,
        url
    })

    return newTable.save()
}

export function editTable(tableId, data) {
    const table = await this.findById(tableId)

    const {
        name,
        tableUrl
    } = data

    table.name = name
    table.url = tableUrl

    return table.save()
}

export async function toggleEnabled(tableId) {
    const table = await findByIdRequired(this, tableId)

    /* If we are about to enable table (i.e.: currently disabled),
        find an already enabled table and disable it */
    if(!table.enabled) {
        const tableToDisable = this.findOne({ $and: 
            [{enabled: true}, {_id: {$ne: tableId}}] })
        
        // First disable formerly enabled table
        if(tableToDisable) {
            tableToDisable.enabled = false
            await tableToDisable.save()
        }

        // Then enabled the requested table
        table.enabled = true
    }
    // If table is enabled, disable it
    else {
        table.enabled = false
    }

    return table.save()
}

export async function addThreshold(tableId, threshData) {
    const {
        threshType,
        date,
        isFinal,
        fieldId,
        value
    } = threshData

    const table = await findByIdRequired(this, tableId)

    const newThreshold = {
        threshType,
        date,
        isFinal,
        field: fieldId,
        value
    }

    const thresholds = table.thresholds
    thresholds.push(newThreshold)

    return table.save()
}

export async function editThreshold(tableId, threshId, threshData) {
    const {
        date,
        isFinal,
        value
    } = threshData

    const table = await findByIdRequired(this, tableId)

    const threshold = table.thresholds.id(threshId)

    threshold.set({
        ...threshold,
        date,
        isFinal,
        value
    })

    await table.save()
    return threshold
}

export async function removeThreshold(tableId, threshId) {
    const table = await findByIdRequired(this, tableId)
    const threshold = table.thresholds.id(threshId)

    return threshold.remove()
}

export async function deleteTable(id) {
    return this.findOneAndRemove({ _id: id })
}