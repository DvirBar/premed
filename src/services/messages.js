// Construct an http message and send it
export const sendHttpMessage = (res, message, status) => {
    const msgStatus = message.status || status || 200
    const msgTxt = message.msg || message

    return res.send(msgTxt).status(msgStatus)
}
