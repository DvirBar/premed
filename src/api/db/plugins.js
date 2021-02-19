export function escapeEmptyDocsPlugin(schema) {
    schema.post(['findOne', 'findOneAndRemove'], function(doc) {
        if(!doc) {
            throw new Error('Cound not find item, action aborted')
        }
    })
}