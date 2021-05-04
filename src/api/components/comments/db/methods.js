export async function getByItem(itemId) {
    const comments = await this.find({ item: itemId })
    return comments
}