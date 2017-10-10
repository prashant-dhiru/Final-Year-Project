//importing required packages installed by npm
const _ = require('lodash');
const express = require('express');

//making router from express to make this route available to main index.js file
const router = express.Router();

//requiring mngoose and pulling out ObjectId from it for validations
const ObjectId = require('mongoose').Types.ObjectId;

//importing middleware from middleware directory to authenticate admin
const {adminAuthenticate} = require('../middleware/adminAuthenticate');

//importing admin from config directory
const admin = require('../config/admin');

//importing models from models directory
const {Exam} = require('../models/exam');
const {MCQuestion} = require('../models/mcqQuestion');

const {AggregateExamResult} = require('../models/aggregateExamResult');
const {AggregateExamQuestionAnalysis} = require('../models/aggregateExamQuestionAnalysis');

/*************************************************
 * Route to Login the Admin into the system
 * This is a public route, anyone can access this route
 */
router.post('/admin/login', (request, response) => {

    //checking if someone is already logged in (student/admin)
    if (request.session.isAuthenticated)
        // if logged in, sending Method no allowed status code with message
        return response.status(405).send(`SomeOne Already logged in.`);

    //checking if the supplied password is not equal to the Admin's pass
    if (request.body.password !== admin.getPassword())
        //if not equal, sending message with Bad Request Status Code
        return response.status(400).send('Unauthorised access');

    // creating the session information here, so that admin can be marked as signed in
    request.session.isAuthenticated = true;
    request.session.userLevel = 0;
    
    //sending back empty response to client side
    response.send('hello from system');
    
    //route completes here
});
/********************************************************************************************************* */

/*******************************************************
 * Route to check if admin is authenticated, to be used during development only
 * This is a private route, only authenticated admin can use this route
 */
router.get('/admin/me', adminAuthenticate, (request, response) => {
    
    //sending message to confirm that access is permitted
    response.send('You have access to admin panel');

    //route completes here
});
/********************************************************************************************************* */

/********************************************************
 * Route to logout the admin
 * This is a private route, only authenticated admin can use this route
 */
router.delete('/admin/logout', adminAuthenticate, (request, response) => {
    
    //destroying the session, removing it from database
    request.session.destroy ((error) => {
        //if error occurs while destroying the database, error with Internal service error status code is send
        if (error) return response.status(500).send(error);

        //on successful deletion of session, response with OK status code is sent
        response.send('Logout Successful');
    });
    //route completes here
});
/********************************************************************************************************* */

/*******************************************************
 * Route to create an exam
 * This is a private route, only authenticated admin can access this route
 */
router.post('/admin/createExam', adminAuthenticate, (request, response) => {

    // picking all required keys here, leaving any extra key if sent by user
    var body = _.pick(request.body, ['name', 'description', 'allowedTime', 'subject']);

    //creating new exam
    var exam = new Exam(body);

    /* Creating Demo Document here for Insertion */
    // var aggregateExamResult = new AggregateExamResult({exam: exam._id});
    /* Creation Complete */

    //creating a loop fo each question in the request.body
    // request.body.questions.forEach(function(element) {
        
    //     //assigning exam id in each question 
    //     element.exam = exam._id;
        
    //     //creating new question
    //     var question = new MCQuestion(element);
        
    //     /* Inserting Demo Documents here */
    //     var aggregateExamQuestionAnalysis = new AggregateExamQuestionAnalysis({
    //         exam: exam._id,
    //         question: question._id
    //     });
    //     aggregateExamResult.questionAnalysis.push(aggregateExamQuestionAnalysis._id);
    //     aggregateExamQuestionAnalysis.save().catch((error) => console.log(error));
    //     /* Demo Documents Insertion finished */

    //     //pushing question id in exam.questions array
    //     exam.questions.push(question._id);
        
    //     //saving the question document in database
    //     question.save().catch((error) => console.log(error));
    // });

    /* Inserting Demo Documents here */
    // aggregateExamResult.save().catch((error) => console.log(error));
    /* Demo Documents Insertion finished */

    //finally saving the exam into the database while handling any error
    // if any error, sending the error back with Internal Service Error
    exam.save().then(() => response.send(exam), (error) => response.status(500).send(error));
    //route finishes here
});
/********************************************************************************************************* */

/**
 * Route to insert questions into an exam
 * This route is private, only authenticated admin can use this route
 */
router.post('/admin/exam/:id/insertque',adminAuthenticate, (request, response) => {
    

    //fetching the examID from the request parameter
    var id = request.params.id;
    
    /* Checking if the id is valid or not */
    if (!ObjectId.isValid(id))
        //if invalid, responsing with text and Bad Request status code
        return response.status(400).send('Invalid Exam ID');

    //picking all required elements from request, leaving all other extra if any
    body = _.pick(request.body, ['body', 'answerOptionOne', 'answerOptionTwo', 'answerOptionThree', 'answerOptionFour', 'correctAnswer', 'marksForCorrectAnswer', 'negativeMark', 'difficulty']);
    
    //creating new question
    var question = new MCQuestion(body);

    //searching for exam to push the id in
    Exam.findById(id).exec((error, exam) => {

        //if error occures, sending error with Internal Server Errorerror code and returning
        if (error) return response.status(500).send(error)

        //if there is no exam in database with the id, sending emty response back with Not Found status code
        if (!exam) return response.status(404).send('No exam with such ID');

        // saving the question document in database
        question.save().then(() => {

            //pushing question id in exam.questions array via the document function
            exam.addQuestionRef(question._id);

            response.send(question);

        // Handling any potential error by sending error with Internal Server Errorerror code
        }, (error) => response.status(500).send(error));

    });

    //route finishes here
});
/********************************************************************************************************** */

/************************************************************
 * This route is used to check if the exam created is successfully saved in the database
 * All details of the exam are fetched in this route, any missing detail will be manually inspected by the response
 * This is a development only route, though it can be used in production
 * This route is private, only authenticated admin can access this route
 */
router.get('/admin/exam/:id', adminAuthenticate, (request, response) => {

    //fetching the examID from the request parameter
    var id = request.params.id;

    /* Checking if the id is valid or not */
    if (!ObjectId.isValid(id))
        //if invalid, responsing with text and Bad Request status code
        return response.status(400).send('Invalid Exam ID');
    
    //Searching for exam in database and fetching all questions details with the exam
    Exam.findById(id).populate('questions').exec((error, exam) => {

        //if error occurs, sending back error with Internal Server error status code
        if (error) return response.status(500).send(error);

        //if there is no exam in database with the id, sending emty response back with Not Found status code
        if (!exam) return response.status(404).send();

        //Sending the exam as response when all conditions are good
        response.send(exam);
    });
    //route completes here
});
/********************************************************************************************************* */

//Exporting the router to be used in the main application file
module.exports = router;