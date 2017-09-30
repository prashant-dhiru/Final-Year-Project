const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const AggregateExamQuestionAnalysisSchema = new mongoose.Schema({

    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'MCQuestion' },
    cutOff: {
        type: Number,
        default: 0
    },
    avreageTimeTakenByStudents: {
        type: Number,
        default: 0
    },
    avreageTimeTakenByStudentsWhoGotThisQuestionRight: {
        type: Number,
        default: 0
    },
    percentageOfStudentWhoAttempted: {
        type: Number,
        default: 0
    },
    percentageOfStudentWhoAttemptedGotThisQuestionRight: {
        type: Number,
        default: 0
    },
    studentsAttempted: {
        type: Number,
        default: 0
    }
});

const AggregateExamQuestionAnalysis = mongoose.model('AggregateExamQuestionAnalysis', AggregateExamQuestionAnalysisSchema);
module.exports = {AggregateExamQuestionAnalysis};