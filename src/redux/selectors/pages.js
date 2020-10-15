export const getPathPages = (pages, pathIds) => {
    return pages.filter(page => page.paths.find(path => 
        pathIds.includes(path)))
}