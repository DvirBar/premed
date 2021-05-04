export const getPathPages = (pages, pathIds) => {
    return pages.filter(page => page.paths.find(path => 
        pathIds.includes(path)))
}

export const getPageByUrl = (pages, pageUrl) => {
    return pages.find(page => page.url === pageUrl)
}