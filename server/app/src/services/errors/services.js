import ErrorHandler from './db/model'

export const create = (errContent, request) => {
    const newError = new ErrorHandler({
        title: errContent.Error || errContent.message,
        request,
        content: errContent
    })

    return newError.save()
}