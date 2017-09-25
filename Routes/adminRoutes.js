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

    var body = _.pick(request.body, ['name', 'description', 'allowedTime', 'subject', 'assignedInCharge']);
    var exam = new Exam(body);

    request.body.questions.forEach(function(element) {
        element.exam = exam._id;
        var question = new MCQuestion(element);
        exam.questions.push(question._id);
        question.save().catch((error) => console.log(error));
    });

    exam.save().then(() =>{
        response.send(exam);
    }).catch((error) => response.status(400).send(error));

});

router.get('/admin/exam/:id',adminAuthenticate, (request, response) => {
    if (!request.isAdmin)
        return response.status(401).send('You cannot access admin panel');

    var id = request.params.id;
    Exam.findById(id).populate('questions').exec((error, exam) => {
        if (error) 
            response.status(400).send(error);
        response.send(exam);
    });
});

router.post('/admin/login', (request, response) => {
    
    if (!request.body.password)
        response.status(400).send('Password Field Empty');
    
    if (findByCredentials(request.body.password).passTrue === false)
        return response.send('Unauthorised access');

    response.header('x-auth', generateAuthToken()).send();
    
});

module.exports = router;