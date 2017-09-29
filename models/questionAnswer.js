const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const _ = require('lodash');
const {MCQuestion} = require('./question');

const QuestionAnswerSchema = new mongoose.Schema({

    question: { type: mongoose.Schema.Types.ObjectId, ref: 'MCQuestion' },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    timeTaken: {
        type: Number,
        required: true
    },
    answerSubmitted: {
        type: String,
        required: true
    },
    isAnswerCorrect: {
        type: Boolean   //(will be evaluated before save call, pre save),
    },
    marksObtained: {
        type: Number    //(can be positive or negative)
    }
});

QuestionAnswerSchema.pre('save', function (next) {
    var questionAnswer = this;

    MCQuestion.findById(questionAnswer.question).then((question) => {
        if (question.correctAnswer == questionAnswer.answerSubmitted) {
            questionAnswer.isAnswerCorrect = true;
            questionAnswer.marksObtained = question.marksForCorrectAnswer;
        } else {
            questionAnswer.isAnswerCorrect = false;
            questionAnswer.marksObtained = -question.negativeMark;
        }
        next();
    }, (error) => {
        console.log('Error Occured in questionAnswer: ', error);
        next();
    });

}); //final

const QuestionAnswer = mongoose.model('QuestionAnswer', QuestionAnswerSchema);

module.exports = {QuestionAnswer};