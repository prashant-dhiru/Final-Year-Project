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

    //'exam', 'questionAnalysis', 'cutOff', 'studentsAttempted', 'averageQuestionsAttempted', 'averageTimeSpent', '_id', '__v'

    //Schema definiton finishes here
});

/**
 * @param {ObjectId} examId
 * @param {AggregateExamResult} this
 * @return {Promise} getComparableData
 * resolved with the document if success, rejected with error if error
 * Model Method
 */
AggregateExamResultSchema.statics.getComparableData = function (examId) {

    // returning the promise returned after calculating the comparable data
    return this.findOne({exam: examId}).exec((error, aggregateExamResult) => {        
        
        // if error occured while fnding the document, returning error
        if (error) return Promise.reject(error);
        
        // if no document found, it means no document seeding has been done, rejecting request
        if (!aggregateExamResult) return Promise.reject('No Document Seeding Has been done');

        //returning the promise returned by the calculator function, success or error
        return aggregateExamResult.calculateComparableDataByDocument();
    });

    //method finishes here
};

/**
 * @param {any} this
 * @return {Promise} calculateComparableDataByDocument
 * resolved with document if success, rejected with error if error
 * Document method
 */
AggregateExamResultSchema.methods.calculateComparableDataByDocument = function () {

    // assigning the this value into a variable to peform saving
    aggregateExamResult = this;

    //finding the exam return data here by the exam
    return ExamReturn.find({exam: aggregateExamResult.exam}).select('totalTimeTaken totalQuestionAttempted marksObtained -_id').then((examReturns) => {

        //setting values for the AggregateExamResult documents
        aggregateExamResult.cutOff = pluckAndReduce(examReturns, 'marksObtained');
        aggregateExamResult.averageQuestionsAttempted = pluckAndReduce(examReturns, 'totalQuestionAttempted');
        aggregateExamResult.averageTimeSpent = pluckAndReduce(examReturns, 'totalTimeTaken');
        aggregateExamResult.studentsAttempted = examReturns.length;
    
        //saving the updated doc into the database and returning the promise
        return aggregateExamResult.save();
    
        /* Catching any potential error that may occur during finding examdata */
    }, (error) => Promise.reject(error)); 
    
    //method finishes here
};

const AggregateExamResult = mongoose.model('AggregateExamResult', AggregateExamResultSchema);
module.exports = {AggregateExamResult};