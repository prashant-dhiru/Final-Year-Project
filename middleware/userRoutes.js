const {Student} = require('../models/student');
const _ = require('lodash');
const {authenticate} = require('./authenticate');

module.exports = (router) => {
    
    router.post('/signup', (request, response) => {
        
        //pick all required elements here
        var student = new Student(request.body);

        student.save().then(() => {
            student.generateAuthToken();
        }).then((token) => {
            response.header('x-auth', token).send(student);
        }).catch((error) => {
            response.status(400).send(error);
        });
    });
    
    router.post('/login', (request, response) => {
        body = _.pick(request.body, ['email', 'password']);

        Student.findByCredentials(body).then((student) => {
            return student.generateAuthToken().then((token) => {
                response.header('x-auth', token).send(student);
            });
        }).catch((error) => response.status(400).send());
    });

    router.post('/logout', authenticate, (request, response) => {
        request.student.removeToken(request.token).then(() => {
            response.status(200).send();
        }).catch(() => response.status(401).send());
    });

    router.get('/me', authenticate, (request, response) => {
        response.send(request.student);
    });

    return router;
}