const Library = require('./model')

class libraryDb {
    // Get all libraries
    static getAll() {
        return Library.find()
    }

    // Create new library entry
    static create(data) {
        const {
            name, 
            info, 
            parentId
        } = data

        const newLib = new Library({
            name,
            info,
            parent: parentId
        })

        return newLib.save()
    }

    // Update library details
    static async update(id, data) {
        const {
            name, 
            info,
            parentId
        } = data

        try {
            const lib = await Library.findOne({_id:id})
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
    static async getItemById(params) {
        const {
            id,
            itemId
        } = params

        try {
            const lib = await Library.findOne({_id: id})

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

    // Add new item to library
    static async addItem(id, data) {
        const {
            name,
            icon,
            link            
        } = data

        try {
            const lib = await Library.findOne({ _id: id })
            const item = {
                name,
                icon,
                link
            }
            const items = lib.items

            items.push(item)

            await lib.save()

            return lib.items[items.length - 1]
        }

        catch(err) {
            throw err;
        }
    }

    // Edit library item
    static async editItem(params, data) {
        const { id, itemId } = params;
        const { 
            name,
            icon,
            link
        } = data 

        try {
            const lib = await Library.findById(id)
            const item = lib.items.id(itemId)

            if(!item) {
                throw new Error('Cannot find requested item')
            }

            item.set({
                name,
                icon,
                link
            })

            await lib.save()
            return item
        }
        
        catch(err) {
            throw err;
        }
    }

    static async removeItem(params) {
        const {
            id,
            itemId
        } = params
        
        try {
            const lib = await Library.findById(id)
            const item = lib.items.id(itemId)

            await item.remove()

            return true
        }

        catch(err) {
            throw err;
        }
    }

    // Delete library entry
    static delete(id) {
        try {
            return Library.findOneAndRemove({ _id: id })
        }

        catch(err) {
            throw err
        }
    }
}

export default libraryDb