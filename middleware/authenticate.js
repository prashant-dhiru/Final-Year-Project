const {Student} = require('../models/student');

var authenticate = (request, response, next) => {

    if (!request.session.isAuthenticated)
        return response.status(401).send();

    if (request.session.userLevel == 0)
        return next();

    Student.findById(request.session.userId).then((student) => {
        request.student = student;
        next();
    }).catch((error) => response.status(501).send(error));

};

module.exports = {authenticate};