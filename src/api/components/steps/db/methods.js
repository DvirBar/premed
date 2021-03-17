import Path from '../../../../staticData/baseData/Path'

export function getAllNoAuthor() {
    return this.find().select('-author')
}

export function getStepsByPath(pathId) {
    const pathInstance = new Path

    // Check that path exists
    pathInstance.getPathById(pathId)

    return this
        .find({ path: pathId })
        .select('-author')
}
