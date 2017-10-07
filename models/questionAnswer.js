//importing required packages installed by npm
const mongoose = require('mongoose');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

//importing other models to be used in methods
const {MCQuestion} = require('./mcqQuestion');

const QuestionAnswerSchema = new mongoose.Schema({

    question: { type: mongoose.Schema.Types.ObjectId, ref: 'MCQuestion' },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    timeTaken: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    answerSubmitted: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
        trim: true
    },
    isAnswerCorrect: {
        type: Boolean
    },
    marksObtained: {
        type: Number,
        maxlength: 2
    }

    //'question', 'exam', 'timeTaken', 'answerSubmitted', 'isAnswerCorrect', 'marksObtained', '_id'

    //Schema definiton finishes here
});

/**
 * @param {any} this
 * document method
 */
QuestionAnswerSchema.pre('save', function (next) {

    //finding the question by this document's questionID to match answer
    MCQuestion.findById(this.question).then((question) => {

        //marking answer correct or incorrect and giving marks by comparing the submitted answers with real answers
        if (question.correctAnswer == this.answerSubmitted) {
            this.isAnswerCorrect = true;
            this.marksObtained = question.marksForCorrectAnswer;
        } else {
            this.isAnswerCorrect = false;
            this.marksObtained = -question.negativeMark;
        }
        next();
        //handling any potential error that may occur
    }, (error) => next(error));

    //method finishes here
});

const QuestionAnswer = mongoose.model('QuestionAnswer', QuestionAnswerSchema);
module.exports = {QuestionAnswer};