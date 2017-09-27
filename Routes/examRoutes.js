const _ = require('lodash');
const {authenticate} = require('../middleware/authenticate');
var express = require('express');
var router = express.Router();
const {Exam} = require('../models/exam');

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
});

router.get('/exam', authenticate, (request, response) => {
    if (request.session.userLevel == 0)
        return response.status(401).send();

    Exam.find({}).exec((error, exam) => {
        if (error) 
            return response.status(400).send(error);
        response.send(exam);
    });
});

module.exports = router;