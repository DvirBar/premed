// Pre save middleware
export function authPreSave(next) {
    this.email = this.email.toLowerCase()
    next()
}
