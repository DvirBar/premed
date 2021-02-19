export const saveDoc = doc => {
    try {
        return doc.save()
    }

    catch(err) {
        throw err;
    }
}