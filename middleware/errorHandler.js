const Error = require('../models/Error');

const errorHandler = (err, req, res, next) => {
    try {
        // Handling unique field errors
        if (err.name === 'MongoError' && err.code === 11000) {
            const modelName = res.locals.model
            const fieldName = Object.keys(err.keyValue)[0]
            return res.status(400).send({ msg: `A ${modelName} with this ${fieldName} already exists`})
        }

        // Handling cast errors
        if(err.name === 'CastError') {
            return res.status(400).send({ msg: `Invalid ${err.path}: ${err.value}` })
        }
        
        if(err.errors)
            return res.status(400).send({ msg: err.message }) 

        // Internal server error that shouldn't be sent to the client
        const newError = new Error({
            content: String(err.message),
            user: res.locals.user.id,
            fixed: false
        });

        newError.save()
                .then(() => {return res.status(500).send({msg: "Internal server error"})})
                .catch(() => {return res.status(500).send({msg: "Internal server error"})})

    } catch (err) {
        const newError = new Error({
            content: String(err.message),
            user: res.locals.user.id,
            fixed: false
        });

        newError.save()
                .then(() => {return res.status(500).send({msg: "Internal server error"})})
                .catch(() => {return res.status(500).send({msg: "Internal server error"})})
    }
}

module.exports = errorHandler;