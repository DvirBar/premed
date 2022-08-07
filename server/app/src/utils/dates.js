export const dateInPast = date => {
    return new Date(date).getHours(0, 0, 0, 0) < new Date().getHours(0, 0, 0, 0)
}

export const isToday = date => {
    const today = new Date();

    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
}