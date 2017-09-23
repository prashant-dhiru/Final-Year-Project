const {Student} = require('../models/student');

var authenticate = (request, response, next) => {
    var token = request.header('x-auth');

    Student.findByToken(token).then((student) => {
        if (!student)
            return Promise.reject();
        request.student = student;
        request.token = token;
        next();
    }).catch((error) => response.status(401).send(error));
};

module.exports = {authenticate};