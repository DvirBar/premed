const { model } = require("../models/User");

const errorLogger = (err, req, res, next) => {
    console.log("hi")
    console.log(err);
}

module.exports = errorLogger;