const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const AggregateExamQuestionAnalysisSchema = new mongoose.Schema({

    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'MCQuestion' },
    cutOff: {
        type: Number
    },
    avreageTimeTakenByStudents: {
        type: Number
    },
    avreageTimeTakenByStudentsWhoGotThisQuestionRight: {
        type: Number
    },
    percentageOfStudentWhoAttempted: {
        type: Number
    },
    percentageOfStudentWhoAttemptedGotThisQuestionRight: {
        type: Number
    }
});

const AggregateExamQuestionAnalysis = mongoose.model('AggregateExamQuestionAnalysis', AggregateExamQuestionAnalysisSchema);
module.exports = {AggregateExamQuestionAnalysis};