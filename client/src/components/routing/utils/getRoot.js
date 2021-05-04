export default function getRoot(url) {
    return `/${url.split('/')[1]}`
}