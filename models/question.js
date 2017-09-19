const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');

const QuestionSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000,
        trim: true
    },
    answerOptions: [{
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
        trim: true
    }],
    correctAnswer: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
        trim: true
    },
    marksForCorrectAnswer: {
        type: number,
        required: true,
        maxlength: 2
    },
    negativeMark: {
        type: number,
        required: true,
        maxlength: 2
    },
    difficulty: {
        type: number,
        min: 1,
        max: 5
        /*validate: {
            validator: value => validator.isIn(value, [1, 2, 3, 4, 5]),
            message: '{VALUE} must be between 1 (lowest difficulty) to 5 (highest difficulty).'
        }*/
    },
    numberOfOptions: this.answerOptions.length

});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = {Question};