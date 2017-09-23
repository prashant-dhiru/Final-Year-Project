const _ = require('lodash');

const {adminAuthenticate} = require('../middleware/adminAuthenticate');
const {Exam} = require('../models/exam');
const {findByCredentials, generateAuthToken} = require('../models/admin');
const {MCQuestion} = require('../models/question');

var express = require('express');
var router = express.Router();

router.get('/admin/me', adminAuthenticate, (request, response) => {
    if (!request.isAdmin)
        return response.status(401).send('You cannot access admin panel');
    response.send('You ave access to admin panel');
});

router.post('/admin/createExam', adminAuthenticate, (request, response) => {
    if (!request.isAdmin)
        return response.status(401).send('You cannot access admin panel');

    var exam = new Exam(request.body);  // use lodash created body instead of actual body here

    if (!exam)
        response.status(400).send('bad exam');

    exam.save().then((examdoc) => {
        response.send(examdoc);
    }, (error) => response.status(400).send(error));

});


/*
router.post('/admin/createExam', adminAuthenticate, (request, response) => {
    if (!request.isAdmin)
        return response.status(401).send('You cannot access admin panel');

    questions = request.body.questions;

    var idarray = [];

    questions.forEach(function(element) {
        var question = new MCQuestion(element);
        question.save().then((doc) => idarray.push(doc._id), (error) => console.log(error));
    });

    var body = _.pick(request.body, ['name', 'description', 'allowedTime', 'subject', 'assignedInCharge']);
    body.questions = idarray;

    var exam = new Exam(body);  // use lodash created body instead of actual body here

    exam.save().then(() =>{
        response.send(exam);
    }).catch((error) => {
        response.status(400).send(error);
    });

});

*/



router.post('/admin/login', (request, response) => {
    
    if (!request.body.password)
        response.status(400).send('Password Field Empty');
    
    if (findByCredentials(request.body.password).passTrue === false)
        return response.send('Unauthorised access');

    response.header('x-auth', generateAuthToken()).send();
    
});

module.exports = router;