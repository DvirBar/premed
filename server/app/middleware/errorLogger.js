const { model } = require("../models/User");

const errorLogger = (err, req, res, next) => {
    console.log(err);
}

module.exports = errorLogger;