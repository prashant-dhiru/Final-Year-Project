const _ = require('lodash');

const {authenticate} = require('../middleware/authenticate');
const {Exam} = require('../models/exam');
const {MCQuestion} = require('../models/question');

const {AggregateExamResult} = require('../models/aggregateExamResult');
const {AggregateExamQuestionAnalysis} = require('../models/aggregateExamQuestionAnalysis');

var express = require('express');
var router = express.Router();

router.post('/admin/login', (request, response) => {
    // do pickings here
    
    if (request.body.password !== 'adminpass')
        response.send('Unauthorised access');

    request.session.isAuthenticated = true;
    request.session.userLevel = 0;
    response.send();
    
});

router.get('/admin/me', authenticate, (request, response) => {
    if (request.session.userLevel == 1)
        return response.status(401).send();
    
    response.send('You have access to admin panel');
});

router.post('/admin/logout', authenticate, (request, response) => {
    if (request.session.userLevel == 1)
        return response.status(401).send();
    
    request.session.destroy ((error) => {
        if (error)
            return response.status(406).send(error);
        response.status(200).send();
    });
});

router.post('/admin/createExam', authenticate, (request, response) => {
    if (request.session.userLevel == 1)
        return response.status(401).send();

    var body = _.pick(request.body, ['name', 'description', 'allowedTime', 'subject']);

    var exam = new Exam(body);

    /* Creating Demo Document here for Insertion */
    var aggregateExamResult = new AggregateExamResult({exam: exam._id});
    /* Creation Complete */

    request.body.questions.forEach(function(element) {
        element.exam = exam._id;
        var question = new MCQuestion(element);
        
        /* Inserting Demo Documents here */
        var aggregateExamQuestionAnalysis = new AggregateExamQuestionAnalysis({
            exam: exam._id,
            question: question._id
        });
        aggregateExamResult.questionAnalysis.push(aggregateExamQuestionAnalysis._id);
        aggregateExamQuestionAnalysis.save().catch((error) => console.log(error));
        /* Demo Documents Insertion finished */

        exam.questions.push(question._id);
        question.save().catch((error) => console.log(error));
    });

    /* Inserting Demo Documents here */
    aggregateExamResult.save().catch((error) => console.log(error));
    /* Demo Documents Insertion finished */

    exam.save().then(() => response.send(exam), (error) => response.status(400).send(error));

});

router.get('/admin/exam/:id', authenticate, (request, response) => {
    if (request.session.userLevel == 1)
        return response.status(401).send();

    var id = request.params.id;
    Exam.findById(id).populate('questions').exec((error, exam) => {
        if (error) 
            return response.status(400).send(error);
        response.send(exam);
    });
});

module.exports = router;