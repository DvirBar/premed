export const dateInPast = date => {
    return new Date(date).getHours(0, 0, 0, 0) < new Date().getHours(0, 0, 0, 0)
}