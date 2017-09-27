const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const AggregateExamQuestionAnalysisSchema = new mongoose.Schema({

    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    cutOff: {
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