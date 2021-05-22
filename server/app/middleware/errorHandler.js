const { sendHttpMessage } = require('../src/services/messages');
import * as ErrorService from '../src/services/errors/services'

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
                const requestData = {
                    method: req.method,
                    url: req.url
                }   

                ErrorService.create(err, requestData)
            }
            
            return res.status(500).send({ msg: "Internal server error" })
        }
    } catch (err) {
        console.log(err);
        console.log("Error logging failed");
        return res.status(500).send({msg: "Internal server error"})
    }
}

module.exports = errorHandler;