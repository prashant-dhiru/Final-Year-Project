//importing required packages installed by npm
const mongoose = require('mongoose');
const _ = require('lodash');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

//importing other models to be used in methods
const {ExamReturn} = require('./examReturn');
const {QuestionAnswer} = require('./questionAnswer');

//importing functions from methods middleware
const {pluckAndReduce} = require('../middleware/methods');

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


/**
 * @param {String} examId
 * @param {String[]} questionIdArray
 * @param {AggregateExamQuestionAnalysis} this
 * @return {any} Instance of this Model
 * Model Method
 */
//////////////////////////////////////////////////////////////////////////////////////////
 /* Following Method has been deprecated and in replacement, follow method is provided*/
//////////////////////////////////////////////////////////////////////////////////////////
/*AggregateExamQuestionAnalysisSchema.statics.calculateComparableQuestionData = function (examId, questionIdArray) {

    questionIdArray.forEach((questionId) => {
        this.find({exam: examId, question: questionId}).then((aggregateExamQuestionAnalysis) => {
            QuestionAnswer.find({exam: examId, question: questionId}).then((questionAnswers) => {
                finalObj = specialMinifier(questionAnswers, ['timeTaken', 'marksObtained']);

                aggregateExamQuestionAnalysis.cutOff = finalObj.marksObtained;
                aggregateExamQuestionAnalysis.avreageTimeTakenByStudents = finalObj.timeTaken;

                ExamReturn.find({exam: examId}).count((error, studentAttemptedExam) => {
                    if (error)
                        return new Promise.reject(error);

                    aggregateExamQuestionAnalysis.studentsAttempted = questionAnswers.length;

                    var correctAnswerTimes = questionAnswers.map((questionAnswer) => {
                        if (questionAnswer.isAnswerCorrect)
                            return questionAnswer.timeTaken;
                    });

                    aggregateExamQuestionAnalysis.avreageTimeTakenByStudentsWhoGotThisQuestionRight = (_.reduce( correctAnswerTimes, (total, n) => ( total + n ) ) / correctAnswerTimes.length);

                    aggregateExamQuestionAnalysis.percentageOfStudentWhoAttempted = questionAnswers.length * 100 / studentAttemptedExam;

                    aggregateExamQuestionAnalysis.percentageOfStudentWhoAttemptedGotThisQuestionRight = correctAnswerTimes.length * 100 / studentAttemptedExam;

                });

            }).catch((error) => new Promise.reject(error));

            aggregateExamQuestionAnalysis.save().then((doc) => new Promise.resolve(doc)).catch((error) => new Promise.reject(error));
        }).catch((error) => new Promise.reject(error));
    });

    //remake this method on document method

};*/


// //below function discarded
// AggregateExamQuestionAnalysisSchema.statics.getComparableQuestionData = function (examId) {
    
//     return this.findOne({exam: examId}).exec((error, aggregateExamQuestionAnalysisDocs) => {
    
//         if (error) return Promise.reject(error);

//         var finalDocArray = [];

//         aggregateExamQuestionAnalysisDocs.forEach((element) => {

//             element.calculateComparableQuestionDataByDocument().then((aggregateExamQuestionAnalysis) => {
                
//                 finalDocArray.push(aggregateExamQuestionAnalysis);
                
//             }).catch((error) => Promise.reject(error));

//         });
//         return Promise.resolve(finalDocArray);

//     });

//     //method finishes here
// };




/**
 * @param {any} this
 * @return {Promise} calculateComparableQuestionDataByDocument
 * resolved with instance of this model if success, rejected with error if error
 * Document Method
 */
AggregateExamQuestionAnalysisSchema.methods.calculateComparableQuestionDataByDocument = function () {
    
    // this = aggregateExamQuestionAnalysis;
    //questionAnswers.length number of students who attempted this question

    //finding Submitted answers of this exam and question
    return QuestionAnswer.find({exam: this.exam, question: this.question}).select('isAnswerCorrect marksObtained timeTaken -_id').then(function (questionAnswers) {
        
        //calculating values for these two keys
        this.cutOff = pluckAndReduce(questionAnswers, 'marksObtained');
        this.avreageTimeTakenByStudents = pluckAndReduce(questionAnswers, 'timeTaken');

        //total students who attempted this question
        this.studentsAttempted = questionAnswers.length;

        //further calculation requires total number of students who attempted the exam
        //finding the total number of students wo attempted the exam
        return ExamReturn.find({exam: this.exam}).count(function (error, totalStudentWhoAttemptedExam) {
            
            //handling any potential errors
            if (error) return Promise.reject(error);

            //calculating percentages based keys here
            this.percentageOfStudentWhoAttempted = questionAnswers.length * 100 / totalStudentWhoAttemptedExam;
            
            //last two value requires the average times taken by students who got this question right
            //mapping queestions answers to find the Answer which are correct and array of time taken
            var correctAnswerTimes = questionAnswers.map((questionAnswer) => {
                if (questionAnswer.isAnswerCorrect) return questionAnswer.timeTaken;
            });

            //correctanswerTimes.length number of students who attempted this question and got right

            this.percentageOfStudentWhoAttemptedGotThisQuestionRight = correctAnswerTimes.length * 100 / totalStudentWhoAttemptedExam;

            this.avreageTimeTakenByStudentsWhoGotThisQuestionRight = _.reduce( correctAnswerTimes, (total, n) => total+n ) / correctAnswerTimes.length;

            //saving the document, returning the document on success, returning error on error
            return this.save(); //.then(() => Promise.resolve(this), (error) => Promise.reject(error));
        });

        //handling any potential errors
    }, (error) => Promise.reject(error));

    //method finishes here
};


const AggregateExamQuestionAnalysis = mongoose.model('AggregateExamQuestionAnalysis', AggregateExamQuestionAnalysisSchema);
module.exports = {AggregateExamQuestionAnalysis};