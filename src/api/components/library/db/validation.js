class LibraryValidators {
    static async parent(parentId) {
        const Library = require('./model')
        /* 
        *   Parent is optional, only check parent if it 
        *   has been provided 
        */
        if(parentId) {
            try {
                const lib = await Library.findById(parentId)
                return lib
            }
            catch(err) {
                throw err
            }
        }
        
        return true;
    }
}

export default LibraryValidators;
