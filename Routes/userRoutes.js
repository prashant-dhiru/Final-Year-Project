const {Student} = require('../models/student');
const _ = require('lodash');
const {authenticate} = require('../middleware/authenticate');
var express = require('express');
var router = express.Router();

router.post('/user/signup', (request, response) => {
    
    //pick all required elements here
    var student = new Student(request.body);

    student.save().then(() => {
        console.log('/user/signup');
        request.session.isAuthenticated = true;
        request.session.userId = student._id;
        request.session.userLevel = 1;
        response.send(student);
    }).catch((error) => {
        response.status(400).send(error);
    });
});

router.post('/user/login', (request, response) => {
    body = _.pick(request.body, ['email', 'password']);
    Student.findByCredentials(body).then((student) => {
        console.log('/user/login');
        request.session.isAuthenticated = true;
        request.session.userId = student._id;
        request.session.userLevel = 1;
        response.send(student);
    }).catch((error) => response.status(403).send(error));
}); // retest

router.post('/user/logout', authenticate, (request, response) => {
    
    request.session.destroy ((error) => {
        if (error)
            response.status(406).send(error);
        response.status(200).send();
    });

});

router.get('/user/me', authenticate, (request, response) => {
    response.send(request.student);
});

module.exports = router;