//importing required packages installed by npm
const mongoose = require('mongoose');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

//importing other models to be used in methods
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

    //'exam', 'questionAnalysis', 'cutOff', 'studentsAttempted', 'averageQuestionsAttempted', 'averageTimeSpent', '_id'

    //Schema definiton finishes here
});

/* Backup 
AggregateExamResultSchema.statics.getComparableData = function (examId) {
    
return this.findOne({exam: examId}).exec((error, aggregateExamResult) => {
    
    if (error) return Promise.reject(error);
    
    return aggregateExamResult.calculateComparableDataByDocument().then((analyzedExamResult) => Promise.resolve(analyzedExamResult)).catch((error) => Promise.reject(error));

});

//method finishes here
};*/


/**
 * @param {any} this
 * @return {Promise} calculateComparableDataByDocument
 * resolved with document if success, rejected with error if error
 * Document method
 */
AggregateExamResultSchema.methods.calculateComparableDataByDocument = function (callback) {
    
    //finding the exam return data here by the exam
    return ExamReturn.find({exam: this.exam}).then((examReturns) => {

        //setting values for the AggregateExamResult documents
        this.cutOff = pluckAndReduce(examReturns, 'marksObtained');
        this.averageQuestionsAttempted = pluckAndReduce(examReturns, 'totalQuestionAttempted');
        this.averageTimeSpent = pluckAndReduce(examReturns, 'totalTimeTaken');
        this.studentsAttempted = examReturns.length;
    
        //saving the updated doc into the database and returning the saved doc if successfully saved, else returning error
        return this.save(callback);//.then((doc) => Promise.resolve(doc)).catch((error) => Promise.reject(error));
    
        /* Catching any potential error that may occur during finding examdata */
    }, (error) => Promise.reject(error)); 

    //method finishes here
};

const AggregateExamResult = mongoose.model('AggregateExamResult', AggregateExamResultSchema);
module.exports = {AggregateExamResult};