//importing required packages installed by npm
const _ = require('lodash');
var express = require('express');

//making router from express to make this route available to main index.js file
var router = express.Router();

//importing middleware from middleware directory to authenticate students
const {authenticate} = require('../middleware/authenticate');

//importing models from models directory
const {Student} = require('../models/student');


/****************************************
 *Route to signup a new student (user)
 *This is a public route, i.e. unauthorised users can access this route
 */
router.post('/user/signup', (request, response) => {

    //checking if someone is already logged in (student/admin)
    if (request.session.isAuthenticated)
        // if logged in, sending Method no allowed status code with message
        return response.status(405).send(`SomeOne Already logged in.`);
    
    //picking all necessary values here, leaving other extra if any sent from client, by lodash's pick method
    var body = _.pick(request.body, ['firstName', 'lastName', 'middleName', 'phoneNumber', 'email', 'address', 'password']);
    
    //creating a new student from loasdh picked body here
    var student = new Student(body);

    // saving the student here into the database
    student.save().then(() => {

        // creating the session information here, so that student can be marked as signed in
        request.session.isAuthenticated = true;
        request.session.userId = student._id;
        request.session.userLevel = 1;

        //sending back the user to the client side
        response.send(student);
    }, /*
        Handing any potential error that may occur during saving the user into the database with Service unavailable status code
    */(error) => response.status(503).send(error));
    //route completes here
});
/*********************************************************************************************** */

/**********************************************************
 * route to login a user with his email and password.
 * This is a public route i.e. unauthorised users can also access this
 */
router.post('/user/login', (request, response) => {

    //checking if someone is already logged in (student/admin)
    if (request.session.isAuthenticated)
        // if logged in, sending Method no allowed status code with message
        return response.status(405).send(`SomeOne Already logged in.`);

    //picking all necessary values here, leaving other extra if any sent from client, by lodash's pick method
    body = _.pick(request.body, ['email', 'password']);
    
    //calling findByCredentials method defined on Student model as model method, will return wither student in sucess case, or error in error case
    Student.findByCredentials(body).then((student) => {
        
        // creating the session information here, so that student can be marked as signed in
        request.session.isAuthenticated = true;
        request.session.userId = student._id;
        request.session.userLevel = 1;

        //sending back the user to the client side
        response.send(student);
    }, /*
        Handing any potential error that may occur during saving the user into the database with Service unavailable status code
    */(error) => response.status(503).send(error));

    //route completes here
});
/****************************************************************************************** */

/**************************************************
 * Route to logout a user (student)
 * This is a private route, only authorised users can use this route.
 */
router.post('/user/logout', authenticate, (request, response) => {

    //checking if the authenticated user is odinary user (student)
    if (request.session.userLevel == 0)
        //if the authorised user is admin, empy response with unauthorised status code is send
        return response.status(401).send();
    
    //destroying the session, removing it from database
    request.session.destroy ((error) => {
        //if error occurs while destroying the database, error with Internal service error status code is send
        if (error) return response.status(500).send(error);
        
        //on successful deletion of session, response with OK status code is sent
        response.send('User Logged out');
    });

    //route completes here
});
/********************************************************************************************************* */

/**************************************************
 * Route to check if a user (student) is authenticated, to be used during development only
 * This is a private route, only authenticated users can use this route
 */
router.get('/user/me', authenticate, (request, response) => {
    
    //checking if the authenticated user is odinary user (student)
    if (request.session.userLevel == 0)
        //if the authorised user is admin, empy response with unauthorised status code is send
        return response.status(401).send();
    
    //sending the student back as response with OK status code is sent
    response.send(request.student);
    //route completes here

});
/********************************************************************************************************** */

/**
 * Route to check if a email Already exists in database
 * returning true if found in database, else returning false
 * This is a public route, anyone can access this route
 */
router.post('/user/email', (request, response) => {

    //searching through the database for any student with that email
    Student.find({email: request.body.email}).then((student) => {
        
        // if any student found, returning true
        if (student.length) return response.send({found: true});

        //if no student with that email, returning false
        response.send({found: false});

        //handing any potential error and responsing with true (email found)
    }, (error) => response.send({found: true}));

    //route completes here
});
/****************************************************************************************** */

//Exporting the router to be used in the main application file
module.exports = router;