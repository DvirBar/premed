export function getTableDataVals(
    pathId, 
    tableId, 
    filters, 
    lastId,
    limit) {

    const queries = {
        "tables.table": tableId,
        "tables.paths": {$in: [pathId]},
        "tables.enabled": true
    }

    if(lastId) {
        queries._id = {$gt: lastId}
    }



    if(filters?.length > 0) {
        queries.$and = []
        for(let filter of filters) {
            let filterVal = filter.value

            if(typeof(filter.value) === 'boolean') {
                filterVal = filter.value ? 1 : 0;
            }

            queries.$and.push({ "tables.dataVals": {
                $elemMatch: {
                    field: filter.field,
                    value: filterVal
                }
            }})
        }
    }
    
    return this
    .find({ ...queries })
    .limit(limit)
    .select('tables.dataVals.field tables.dataVals.value tables.table')
} 