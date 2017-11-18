//importing required packages installed by npm
const mongoose = require('mongoose');
const _ = require('lodash');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

const { QuestionAnswer } = require('./questionAnswer');
const { ExamReturn } = require('./examReturn');

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
    studentsAttempted: {
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
    }

    // 'exam', 'question', 'cutOff', 'avreageTimeTakenByStudents', 'studentsAttempted', '_id', '__v', 'avreageTimeTakenByStudentsWhoGotThisQuestionRight', 'percentageOfStudentWhoAttempted', 'percentageOfStudentWhoAttemptedGotThisQuestionRight'
});

/**
 * @param {any} this
 * @return {Promise} calculateComparableQuestionDataByDocument
 * resolved with instance of this model if success, rejected with error if error
 * Document Method
 */
AggregateExamQuestionAnalysisSchema.methods.calculateComparableQuestionDataByDocument = function () {
    
    // this = aggregateExamQuestionAnalysis;
    //questionAnswers.length number of students who attempted this question

    aggregateExamQuestionAnalysis = this;

    //finding Submitted answers of this exam and question
    return QuestionAnswer.find({exam: this.exam, question: this.question}).select('isAnswerCorrect marksObtained timeTaken -_id').then(questionAnswers => {
        
        // if no answers has been submitted for this question, rejecting the request for anaysis of the question
        if (questionAnswers.length === 0) return Promise.reject('No Question Arnswers length, rejecting request');

        //calculating values for these two keys
        this.cutOff = pluckAndReduce(questionAnswers, 'marksObtained');
        this.avreageTimeTakenByStudents = pluckAndReduce(questionAnswers, 'timeTaken');

        //total students who attempted this question
        this.studentsAttempted = questionAnswers.length;

        //further calculation requires total number of students who attempted the exam
        //finding the total number of students wo attempted the exam
        return ExamReturn.find({exam: this.exam}).count((error, totalStudentWhoAttemptedExam) => {

            //handling any potential errors
            if (error) return Promise.reject(error);
            if (totalStudentWhoAttemptedExam <= 0) return Promise.reject('No students who have attempted exam, rejecting request');

            //calculating percentages based keys here
            this.percentageOfStudentWhoAttempted = questionAnswers.length * 100 / totalStudentWhoAttemptedExam;
            
            //last two value requires the average times taken by students who got this question right
            //mapping queestions answers to find the Answer which are correct and array of time taken
            var correctAnswerTimes = [];
            questionAnswers.map((questionAnswer) => {
                if (questionAnswer.isAnswerCorrect) return correctAnswerTimes.push(questionAnswer.timeTaken);
            });

            //correctanswerTimes.length number of students who attempted this question and got right

            this.percentageOfStudentWhoAttemptedGotThisQuestionRight = correctAnswerTimes.length * 100 / questionAnswers.length;

            // if some student has done this question right, finding the aerage tme for the right answer
            if (correctAnswerTimes.length) {
                this.avreageTimeTakenByStudentsWhoGotThisQuestionRight = _.reduce( correctAnswerTimes, (total, n) => total+n ) / questionAnswers.length;

                // if no students has done the answer correctly, setting the value to 0
            } else {
                this.avreageTimeTakenByStudentsWhoGotThisQuestionRight = 0;
            }

            //saving the document, returning the promise
            return this.save();
        });

        //handling any potential errors
    }, (error) => Promise.reject(error));

    //method finishes here
};

const AggregateExamQuestionAnalysis = mongoose.model('AggregateExamQuestionAnalysis', AggregateExamQuestionAnalysisSchema);
module.exports = {AggregateExamQuestionAnalysis};

// avreageTimeTakenByStudentsWhoGotThisQuestionRight: Number =  sumOfTimeOfAllUsersWhoGotThisQuestionRightForThisQuestion / countOfAllUsersWhoAttemptedThisQuestion
//questionReturnForExamWhoGotThisQuestionRight

// percentageOfStudentWhoAttempted: Number = totalNumberOfStudentsWhoAttemptedThisQuestion * 100 / totalNumberOfStudentsWhoAttemptedThisExam

// percentageOfStudentWhoAttemptedGotThisQuestionRight: Number
// countOfAllUsersWhoGotThisQuestionRight * 100 / countOfAllUsersWhoAttemptedThisQuestion