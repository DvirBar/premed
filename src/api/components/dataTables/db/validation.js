export default function validateYear(year) {
    const baseYear = 2018
    const nextYear = (new Date()).getFullYear() + 1

    return year >= baseYear && year <= nextYear
}