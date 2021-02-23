export async function getByIdOrFail(id) {
    const modelName = this.schema.options.modelName

    const doc = await this.findById(id)
    if(!doc) {
        throw `Could not find ${modelName}, action aborted`
    }
}

export async function insert(data) {
    const newDoc = new this(data)

    return newDoc.save()
}


 
