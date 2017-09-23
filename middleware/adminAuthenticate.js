const {ADMIN_ID} = require('../models/admin');
const jwt = require('jsonwebtoken');

var adminAuthenticate = (request, response, next) => {
    var token = request.header('x-auth');
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return Promise.reject(error);
    }

    if (decoded._id != ADMIN_ID)
        return Promise.reject();
    
    request.isAdmin = true;
    next();
};

module.exports = {adminAuthenticate};
