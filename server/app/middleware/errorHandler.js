const Error = require('../models/Error');
const { sendHttpMessage } = require('../src/services/messages');

const errorHandler = (err, req, res, next) => {
    try {
        if(err.status && err.msg) {
            return sendHttpMessage(res, err)
        }
        else {
            if(process.env.NODE_ENV !== 'production') {
                console.log(err);
            }

            else {
                // Log to database
            }
            
            return res.status(500).send({ msg: "Internal server error" })
        }
    } catch (err) {
        throw err;
        // return res.status(500).send({msg: "Internal server error"})
    }
}

module.exports = errorHandler;