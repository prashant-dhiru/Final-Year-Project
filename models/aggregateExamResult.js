const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const AggregateExamResultSchema = new mongoose.Schema({

    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    questionAnalysis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AggregateExamQuestionAnalysis' }],
    cutOff: {
        type: Number
    },
    studentsAttempted: {
        type: Number
    }
});

const AggregateExamResult = mongoose.model('AggregateExamResult', AggregateExamResult);
module.exports = {AggregateExamResult};