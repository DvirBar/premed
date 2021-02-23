import * as staticMethods from './methods'

export function escapeEmptyDocsPlugin(schema) {
    schema.post(['findOne', 'findOneAndRemove'], function(doc) {
        if(!doc) {
            throw new Error('Cound not find item, action aborted')
        }
    })
}

export function CostructStaticMethods(schema, options) {
    const {
        customStaticMethods = {}
    } = options || {}

    schema.statics = {
        ...staticMethods,
        ...customStaticMethods
    }
}