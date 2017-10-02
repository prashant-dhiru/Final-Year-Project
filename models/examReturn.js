//importing required packages installed by npm
const mongoose = require('mongoose');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

//importing other models to be used in methods
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

    //'questionAnswers', 'exam', 'user', 'totalTimeTaken', 'totalQuestionAttempted', 'totalQuestionNotAttempted', 'marksObtained', '_id'

    //Schema definiton finishes here
});

/* Decide If this function can be used */
// ExamReturnSchema.statics.numberOfStudentsWhoAttemptedAQuestion = function (questionId) {
//     var ExamReturn = this;
    
//     return ExamReturn.find({}).where('questionAnswers').in([questionId]).exec(function (error, examReturns) {
//         if (err) return -1;
//         else return examReturns.length;
//     }); 
// };

const ExamReturn = mongoose.model('ExamReturn', ExamReturnSchema);
module.exports = {ExamReturn};