//importing required packages installed by npm
const _ = require('lodash');
const express = require('express');

//making router from express to make this route available to main index.js file
const router = express.Router();

//requiring mngoose and pulling out ObjectId from it for validations
const ObjectId = require('mongoose').Types.ObjectId;

//importing middleware from middleware directory to authenticate students
const {authenticate} = require('../middleware/authenticate');
const {userAuthenticate} = require('../middleware/userAuthenticate');

//importing models from models directory
const {ExamReturn} = require('../models/examReturn');
const {QuestionAnswer} = require('../models/questionAnswer');
const {Exam} = require('../models/exam');

const {AggregateExamResult} = require('../models/aggregateExamResult');
const { AggregateExamQuestionAnalysis } = require('../models/aggregateExamQuestionAnalysis');

/***********************************************************
 * This route is used to get full details about an exam
 * when user is about to start exam, he fetches all exam details from here
 * this route is private, only authentiated users (students) can access this route
 */
router.get('/exam/:id', userAuthenticate, (request, response) => {
    
    //fetching the examID from the request parameter
    var id = request.params.id;

    /* Checking if the id is valid or not */
    if (!ObjectId.isValid(id))
        //if invalid, responsing with text and Bad Request status code
        return response.status(400).send('Invalid Exam ID');

    //fetching the exam from database, and fetching the questions with it
    Exam.findById(id).populate('questions').exec((error, exam) => {

        //if error occurs, sending back error with Internal Server error status code
        if (error) return response.status(500).send(error);
        
        //if there is no exam in database with the id, sending emty response back with Not Found status code
        if (!exam) return response.status(404).send();

        //picking only required properties, leaving other properties
        var body = _.pick(exam, ['name', 'description', 'allowedTime', 'subject', 'createdAt', '_id']);

        //doing manual pickings for questions, no-inbuilt method for it
        var questions = exam.questions.map((question) => {
            return {
                body: question.body,
                answerOptionOne: question.answerOptionOne,
                answerOptionTwo: question.answerOptionTwo,
                answerOptionThree: question.answerOptionThree,
                answerOptionFour: question.answerOptionFour,
                marksForCorrectAnswer: question.marksForCorrectAnswer,
                negativeMark: question.negativeMark,
                difficulty: question.difficulty,
                _id: question._id
            }
        });

        //assigning manually picked questions into the body to send back
        body.questions = questions;

        //sending the exam back to the client
        response.send(body);
    });
    //route finishes here
});
/******************************************************************************************************** */

/*******************************************************
 * This route is used when user wishes to get a list of all exams
 * This route will return exams sorted in descending order date wise
 * This is a private route, only authenticated users can use this route
 */
router.get('/exam', authenticate, (request, response) => {

    //finding all exams descending date order wise
    Exam.find({}).sort('-date').exec((error, exams) => {

        //if error occurs, sending back error with Internal Server error status code
        if (error) return response.status(500).send(error);

        //if there is no exam in database, sending emty response back with Not Found status code
        if (!exams) return response.status(404).send();

        //sending the exam back to the client
        response.send(exams.map((exam) => _.pick(exam, ['name', 'description', 'allowedTime', 'subject', 'createdAt', '_id'])));
    });
    //route finishes here
});
/******************************************************************************************************** */

/**
 * This route will be used when user submits a exam
 * This route is private, only authenticated users can access this route
 */
router.post('/exam/submit/:id', userAuthenticate, (request, response) => {

    //fetching the examID from the request parameter
    var id = request.params.id;

    // Checking if the id is valid or not
    if (!ObjectId.isValid(id))
        //if invalid, responsing with text and Bad Request status code
        return response.status(400).send('Invalid Exam ID');
    
    /* Optional Check, implement at Client Side */
    // check if exam id can be sent with the examReturn data from client as id
    // if (id !== request.body.id)
    //     return response.status(400).send('The ExamID in the address bar has been changed, exam could not be submitted');
    /* Optional Check Complete */
    
    // mapping users's input to be saved in database with correct informtion
    var answers = request.body.questionAnswers.map(questionAnswer => {
        return { 
            exam: id,
            question: questionAnswer.question,
            timeTaken: questionAnswer.timeTaken,
            answerSubmitted: questionAnswer.answerSubmitted
        };
    });

    //creating new examReturn to save the user's response for the exam
    var examReturn = new ExamReturn({
        exam: id,
        user: request.student._id,
        totalTimeTaken: request.body.totalTimeTaken,
        totalQuestionAttempted: answers.length
    });

    //read more about insermany method and use this method if possible
    /*QuestionAnswer.insertmany(answers, (error, questionAnswers) => {
        if (err) return response.status(400).send(err);

        questionAnswers.forEach(questionAnswer => {
            examReturn.questionAnswers.push(questionAnswer._id);
            examReturn.marksObtained += questionAnswer.marksObtained;
        });
        
        examReturn.save().then((examReturnDoc) => {
            response.send('Exam Successfully submitted in Store');
        }, (error) => response.status(400).send(error));
            
    });*/

    // AggregateExamResult.find({exam: id}).then((aggregateExamResult) => {
    //     aggregateExamResult.calculateComparableDataByDocument(function (error, doc) {
    //         if (error) return console.log('Internal error', error);
    //         console.log(doc);
    //     });
    // }).catch((error) => console.log(error));

    //saving all the answers to questions in the database in one function, but one by one
    QuestionAnswer.create(answers, (error, questionAnswers) => {

        //if error occurs, sending back error with Internal Server error status code
        if (error) return response.status(500).send(error);

        // calculating the total marks obtained for the exam and pushing each answer id into examRetrun object
        questionAnswers.forEach(questionAnswer => {
             examReturn.questionAnswers.push(questionAnswer._id);
             examReturn.marksObtained += questionAnswer.marksObtained;
        });

        // saving exam in database
        examReturn.save().then(() => {

            //responsing back as exam successfully stored in database
            response.send('Exam Successfully submitted in Store');

            //Handing any potential errors, sending error to client with the Internal Server error status code
        }, (error) => response.status(500).send(error));

    });

    // route finished here
});
/********************************************************************************************************* */

/************************************************************
 * this route is used then user wishes to fetch results for an exam, passed as query parameter
 * this route is private, only authenticated users can use this route
 */
router.get('/exam/result/:id', authenticate, (request, response) => {

    //fetching the examID from the request parameter
    var id = request.params.id;

    /* Checking if the id is valid or not */
    if (!ObjectId.isValid(id))
        //if invalid, responsing with text and Bad Request status code
        return response.status(400).send('Invalid Exam ID');
    
    
    // ExamReturn.find({exam: id}).populate('questionAnswers').exec((error, examReturn) => {
    //     if (error) return response.status(503).send(error); //Service Unavailable
    //     AggregateExamResult.find({exam: id}).populate('questionAnalysis').exec((error, aggregateExamResult) => {
    //         if (error) return response.status(503).send(error); //Service Unavailable

    //         //here is all the data needed to be sent to the client

    //     });
    // });

    // AggregateExamQuestionAnalysis.find({}).then((docs) => {
    //     response.send(docs);
    // });

    // following functions are tested and running

    AggregateExamResult.getComparableData(id).then((aggregateExamResult) => {

        aggregateExamResult.questionAnalysis.forEach((questionId, index, array) => {
            AggregateExamQuestionAnalysis.find({exam: id, question: questionId}).exec((error, aggregateExamQuestionAnalysis) => {
                aggregateExamQuestionAnalysis.calculateComparableQuestionDataByDocument().then(() => {
                    console.log(aggregateExamQuestionAnalysis);
                }).catch((error) => console.error(error));
            });
            if (index === array.length-1) {
                //last iteration
            }
        });

    }, (error) => response.status(400).send(error));


    //route finished here
});
/******************************************************************************************************** */

//Exporting the router to be used in the main application file
module.exports = router;