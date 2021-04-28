const Error = require('../models/Error');
const { sendHttpMessage } = require('../src/services/messages');

const errorHandler = (err, req, res, next) => {
    try {
        console.log(err);
        if(err.status && err.msg) {
            return sendHttpMessage(res, err)
        }
        else {
            return res.status(500).send({ msg: "Internal server error" })
        }
    } catch (err) {
        throw err;
        // return res.status(500).send({msg: "Internal server error"})
    }
}

module.exports = errorHandler;