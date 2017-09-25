const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');

const MultipleChoiceQuestionSchema = new mongoose.Schema({
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
        type: Number,
        required: true,
        maxlength: 2
    },
    negativeMark: {
        type: Number,
        required: true,
        maxlength: 2
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        maxlength: 1
        /*validate: {
            validator: value => validator.isIn(value, [1, 2, 3, 4, 5]),
            message: '{VALUE} must be between 1 (lowest difficulty) to 5 (highest difficulty).'
        }*/
    },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }

});

const MCQuestion = mongoose.model('MCQuestion', MultipleChoiceQuestionSchema);
module.exports = {MCQuestion};