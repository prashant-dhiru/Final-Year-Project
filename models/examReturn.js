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
        type: Number
        // (can be positive or negative, total of all question's' marksObtained)
    }
});

ExamReturnSchema.statics.numberOfStudentsWhoAttemptedAQuestion = function (questionId) {
    var ExamReturn = this;
    
    return ExamReturn.find({}).where('questionAnswers').in([questionId]).exec(function (error, examReturns) {
        if (err) return 0;
        else return examReturns.length;
    }); 
};

ExamReturnSchema.pre('save', function (next) {
    var examReturn = this;

    examReturn.questionAnswers.forEach((questionAnswerArrayItem) => {
        QuestionAnswer.findById(questionAnswerArrayItem).then((questionAnswer) => {
                examReturn.marksObtained += questionAnswer.marksObtained;
        }).catch((error) => {
            console.log(error);
            next();
        });
    });
    next();

}); //final

// ExamReturnSchema.post('save', function (next) {
//     var examReturn = this;

//     AggregateExamResult.find({exam: examReturn.exam}).then((aggregateExamResult) => {
//         if (aggregateExamResult) {
            
//         } else {
//             // newer
//         }
//     }).catch(() => console.log('Error Occured in Saving'));
// });

const ExamReturn = mongoose.model('ExamReturn', ExamReturnSchema);
module.exports = {ExamReturn};