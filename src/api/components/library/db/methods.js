// Get all libraries
export function getAll() {
    return this.find()
}

export function getByPath(pathId) {
    return this.find({ paths: pathId })
}

// Create new library entry
export function createLibrary(data) {
    const {
        name, 
        info,
        pathIds,
        parentId
    } = data

    const newLib = new this({
        name,
        info,
        paths: pathIds,
        parent: parentId
    })

    return newLib.save()
}

// Update library details
export async function editLibrary(id, data) {
    const {
        name, 
        info,
        parentId
    } = data

    try {
        const lib = await this.findById(id)
        lib.name = name
        lib.info = info 
        lib.parentId = parentId 
        
        return lib.save()
    }
    catch(err) {
        throw err
    }
}


// Find library item by Id
export async function getItemById(libId, itemId) {
    try {
        const lib = await this.getByIdOrFail(libId)

        const item = lib.items.id(itemId) 

        if(item) {
            return {
                lib,
                item
            }
        }

        throw new Error('Cannot find requested item')
    }

    catch(err) {
        throw err;
    }
}

export async function getCommentById(libId, itemId, commentId) {
    const { lib, item } = getItemById(libId, itemId)

    const comment = item.comments.id(commentId)

    if(!comment) {
        throw new Error('Cannot find item comment')
    }

    return {
        lib,
        item,
        comment
    }
}

// Add new item to library
export async function addItem(id, data) {
    try {
        const lib = await this.findById(id)

        const items = lib.items

        items.push(data)

        await lib.save()

        return lib.items[items.length - 1]
    }

    catch(err) {
        throw err;
    }
}

// Edit library item
export async function editItem(params, data) {
    const { id, itemId } = params;

    try {
        const lib = await this.findById(id)
        const item = lib.items.id(itemId)

        if(!item) {
            throw new Error('Cannot find requested item')
        }

        item.set({
            ...item,
            ...data
        })

        await lib.save()
        return item
    }
    
    catch(err) {
        throw err;
    }
}

export async function removeItem(params) {
    const {
        id,
        itemId
    } = params
    
    try {
        const lib = await this.findById(id)
        const item = lib.items.id(itemId)

        await item.remove()

        return true
    }

    catch(err) {
        throw err;
    }
}

// Delete library entry
export async function remove(id) {
    try {
        return this.findOneAndRemove({ _id: id })
    }

    catch(err) {
        throw err
    }
}