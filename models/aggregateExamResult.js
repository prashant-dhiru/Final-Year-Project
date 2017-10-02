const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {ExamReturn} = require('./examReturn');
const {pluckAndReduce} = require('../middleware/methods');

const AggregateExamResultSchema = new mongoose.Schema({

    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    questionAnalysis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AggregateExamQuestionAnalysis' }],
    cutOff: {
        type: Number,
        default: 0
    },
    studentsAttempted: {
        type: Number,
        default: 0
    },
    averageQuestionsAttempted: {
        type: Number,
        default: 0
    },
    averageTimeSpent: {
        type: Number,
        default: 0
    }
});

AggregateExamResultSchema.statics.calculateComparableData = function (examID) {

    // model method
    
    ExamReturn.find({exam: examID}).then((examReturns) => {
        
        this.find({exam: examID}).then((aggregateExamResult) => {

            aggregateExamResult.cutOff = pluckAndReduce(examReturns, 'marksObtained');
            aggregateExamResult.averageQuestionsAttempted = pluckAndReduce(examReturns, 'totalQuestionAttempted');
            aggregateExamResult.averageTimeSpent = pluckAndReduce(examReturns, 'totalTimeTaken');
            aggregateExamResult.studentsAttempted = examReturns.length;
            
            return aggregateExamResult.save().then((doc) => {
                console.log(doc); //<--------------------------------------------------------------------------
                return new Promise.resolve(doc);
            });

        }).catch((error) => new Promise.reject(error));
    }).catch((error) => new Promise.reject(error));
        
};

AggregateExamResultSchema.methods.calculateComparableDataByDocument = function () {
    
    //document method
    ExamReturn.find({exam: this.exam}).then((examReturns) => {

        this.cutOff = pluckAndReduce(examReturns, 'marksObtained');
        this.averageQuestionsAttempted = pluckAndReduce(examReturns, 'totalQuestionAttempted');
        this.averageTimeSpent = pluckAndReduce(examReturns, 'totalTimeTaken');
        this.studentsAttempted = examReturns.length;
                    
    }).catch((error) => new Promise.reject(error));
        
    this.save().then((doc) => {
        console.log(doc); //<--------------------------------------------------------------------------
        return new Promise.resolve(doc);
    }).catch((error) => new Promise.reject(error));

};

const AggregateExamResult = mongoose.model('AggregateExamResult', AggregateExamResultSchema);
module.exports = {AggregateExamResult};