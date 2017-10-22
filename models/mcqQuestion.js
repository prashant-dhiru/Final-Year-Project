//importing required packages installed by npm
const validator = require('validator');
const mongoose = require('mongoose');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

//creating a object to avoid code copying and providing a centralised place for editing
var answerTypeObj = {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
    trim: true
};

const MultipleChoiceQuestionSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000,
        trim: true,
        unique: true
    },
    answerOptionOne: answerTypeObj,
    answerOptionTwo: answerTypeObj,
    answerOptionThree: answerTypeObj,
    answerOptionFour: answerTypeObj,
    correctAnswer: answerTypeObj,
    marksForCorrectAnswer: {
        type: Number,
        required: true,
        maxlength: 2
    },
    negativeMark: {
        type: Number,
        required: true,
        maxlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // difficulty: {
    //     type: Number,
    //     min: 1,
    //     max: 5,
    //     maxlength: 1
    // },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }

    //'body', 'answerOptionOne', 'answerOptionTwo', 'answerOptionThree', 'answerOptionFour', 'correctAnswer', 'marksForCorrectAnswer', 'negativeMark', 'difficulty', 'exam', '_id'
    //schema definition finishes here
});

const MCQuestion = mongoose.model('MCQuestion', MultipleChoiceQuestionSchema);
module.exports = {MCQuestion};