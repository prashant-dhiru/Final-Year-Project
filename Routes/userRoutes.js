const {Student} = require('../models/student');
const _ = require('lodash');
const {authenticate} = require('../middleware/authenticate');
var express = require('express');
var router = express.Router();

router.post('/user/signup', (request, response) => {
    
    //pick all required elements here
    var student = new Student(request.body);

    student.save().then(() => {
        return student.generateAuthToken();
    }).then((token) => {
        response.header('x-auth', token).send(student);
    }).catch((error) => {
        response.status(400).send(error);
    });
});

router.post('/user/login', (request, response) => {
    body = _.pick(request.body, ['email', 'password']);
    Student.findByCredentials(body).then((student) => {
        return student.generateAuthToken().then((token) => {
            response.header('x-auth', token).send(student);
        });
    }).catch((error) => response.status(400).send(error));
}); // retest

router.post('/user/logout', authenticate, (request, response) => {
    token = request.header('x-auth');
    request.student.removeToken(token).then(() => {
        response.status(200).send();
    }).catch((error) => response.status(200).send(error));
});

router.get('/user/me', authenticate, (request, response) => {
    response.send(request.student);
});

module.exports = router;