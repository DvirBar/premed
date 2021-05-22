import htmlSanitizer from 'sanitize-html'

export function commentPreSave(next) {
    this.text = htmlSanitizer(this.text)
    next()
}

export async function commentPostRemove(doc, next) {
    const children = await this.model('Comment').find({ parent: doc._id })
    for(let child of children) {
        child.remove()
    }
    
    next()
}