import baseData from './baseData'
const { paths } = baseData

class Path {
    getPaths() {
        return paths
    }

    getPathById(id) {
        const path = paths.find(path => path._id === id)

        if(!path) {
            throw 'Could not find path'
        }
    }

    populatePaths(ids) {
        return ids.map(id => this.getPathById(id))
    }
}

export default Path