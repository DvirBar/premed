export default function breakUrl(baseUrl, url) {
    if(baseUrl.length > url.length) {
        throw new Error('baseUrl length connot exceed url length')
    }
    
    const index = url.lastIndexOf(baseUrl) + baseUrl.length

    if(index === -1) {
        throw new Error('baseUrl is not in url')
    }
    let slicedUrl = url.slice(index)
    if(!slicedUrl) {
        return []
    }

    if(slicedUrl[0] === '/') {
        slicedUrl = slicedUrl.slice(0)
    }

    if(slicedUrl[slicedUrl.length - 1] === '/') {
        slicedUrl = slicedUrl.slice(slicedUrl.length - 1)
    }

    const nestedPaths = slicedUrl.split('/') 
    if(!Array.isArray(nestedPaths)) {
        return []
    }

    return nestedPaths 
}