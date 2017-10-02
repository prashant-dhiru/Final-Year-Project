const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {QuestionAnswer} = require('./questionAnswer');
const {AggregateExamResult} = require('./aggregateExamResult');

const ExamReturnSchema = new mongoose.Schema({

    questionAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionAnswer' }],
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    totalTimeTaken: {
        type: Number
    },
    totalQuestionAttempted: {
        type: Number
    },
    totalQuestionNotAttempted: {
        type: Number
    },
    marksObtained: {
        type: Number,
        default: 0
        // (can be positive or negative, total of all question's' marksObtained)
    }
});

ExamReturnSchema.statics.numberOfStudentsWhoAttemptedAQuestion = function (questionId) {
    var ExamReturn = this;
    
    return ExamReturn.find({}).where('questionAnswers').in([questionId]).exec(function (error, examReturns) {
        if (err) return -1;
        else return examReturns.length;
    }); 
};

const ExamReturn = mongoose.model('ExamReturn', ExamReturnSchema);
module.exports = {ExamReturn};