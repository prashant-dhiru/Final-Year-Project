const _ = require('lodash');
const {authenticate} = require('../middleware/authenticate');
var express = require('express');
var router = express.Router();
const {Exam} = require('../models/exam');
const {AggregateExamResult} = require('../models/aggregateExamResult');

const {ExamReturn} = require('../models/examReturn');
const {QuestionAnswer} = require('../models/questionAnswer');

router.get('/exam/:id', authenticate, (request, response) => {
    if (request.session.userLevel == 0)
        return response.status(401).send();

    var id = request.params.id;
    Exam.findById(id).populate('questions').exec((error, exam) => {
        if (error) 
            return response.status(400).send(error);

        body = _.pick(exam, []);    
        response.send(exam);
    });
}); // route when student clicks on an exam, not to attemp, but to view full details.

router.post('/exam/:id', authenticate, (request, response) => {
    if (request.session.userLevel == 0)
        return response.status(401).send();

    var id = request.params.id;
    Exam.findById(id).populate('questions').exec((error, exam) => {
        if (error) 
            return response.status(400).send(error);
    
        response.send(exam);
    });

}); // route when student wish to attemp an exam, and click final

router.get('/exam', authenticate, (request, response) => {
    if (request.session.userLevel == 0)
        return response.status(401).send();

    Exam.find({}).exec((error, exam) => {
        if (error) 
            return response.status(400).send(error);
        response.send(exam);
    });
}); // route for getting list of all available exams

router.post('/exam/submit/:id', authenticate, (request, response) => {
    if (request.session.userLevel == 0)
        return response.status(401).send();

    var id = request.params.id;

    var examReturn = new ExamReturn({
        exam: id,
        user: request.student._id,
        totalTimeTaken: request.body.totalTimeTaken,
        totalQuestionAttempted: request.body.totalQuestionAttempted,
        totalQuestionNotAttempted: request.body.totalQuestionNotAttempted
    });

    var answers = request.body.questionAnswers.map(questionAnswer => {
        return { 
            exam: id,
            question: questionAnswer.question,
            timeTaken: questionAnswer.timeTaken,
            answerSubmitted: questionAnswer.answerSubmitted
        };
    });

    QuestionAnswer.create(answers, (err, questionAnswers) => {
        if (err)
            return response.status(400).send(err);
        // push references
        questionAnswers.forEach(questionAnswer => {
             examReturn.questionAnswers.push(questionAnswer._id);
             examReturn.marksObtained += questionAnswer.marksObtained;
        });
        // save exam
        examReturn.save().then((examReturnDoc) => {
           
            // console.log(examReturnDoc);
            /** */
            // AggregateExamResult.findOne({exam: id}).then((aggregateExamResult) => {
            //     if (aggregateExamResult.studentsAttempted) {
            //         aggregateExamResult.cutoff = (aggregateExamResult.cutoff + examReturnDoc.marksObtained) / 2;
            //         aggregateExamResult.averageQuestionsAttempted = (aggregateExamResult.averageQuestionsAttempted + answers.length) / 2;
            //         aggregateExamResult.averageTimeSpent = (aggregateExamResult.averageTimeSpent + examReturnDoc.totalTimeTaken) / 2;
            //     } else {
            //         aggregateExamResult.cutoff = examReturnDoc.marksObtained;
            //         aggregateExamResult.averageQuestionsAttempted = answers.length;
            //         aggregateExamResult.averageTimeSpent = examReturnDoc.totalTimeTaken;
            //     }
            //     aggregateExamResult.studentsAttempted = aggregateExamResult.studentsAttempted + 1;

            //     return aggregateExamResult.save().then((doc) => console.log(doc));
            // }).catch((error) => console.log(error));
            // /** */



            // make this last line
            response.send('Exam Successfully submitted in Store');
        }, (error) => response.status(400).send(error));
    });
    
    
}); // route when student submits the exam

module.exports = router;