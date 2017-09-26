const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {QuestionAnswer} = require('./questionAnswer');

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

ExamReturnSchema.pre('save', function (next) {
    var examReturn = this;

    examReturn.questionAnswers.forEach((questionAnswerArrayItem) => {
        QuestionAnswer.findById(questionAnswerArrayItem).then((questionAnswer) => {
            examReturn.marksObtained += questionAnswer.marksObtained;
        }).catch((error) => console.log(error));
    });
    
}); //final

const ExamReturn = mongoose.model('ExamReturn', ExamReturnSchema);
module.exports = {ExamReturn};