const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {ExamReturn} = require('./examReturn');
const {QuestionAnswer} = require('./questionAnswer');

const {specialMinifier} = require('../middleware/methods');
const _ = require('lodash');

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

AggregateExamQuestionAnalysisSchema.statics.calculateComparableQuestionData = function (examId, questionIdArray) {

    //model method

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

};





AggregateExamQuestionAnalysisSchema.methods.calculateComparableQuestionDataByDocument = function () {
    
    // this = aggregateExamQuestionAnalysis;
    //questionAnswers.length number of students who attempted this question

    QuestionAnswer.find({exam: this.exam, question: this.question}).then((questionAnswers) => {
        finalObj = specialMinifier(questionAnswers, ['timeTaken', 'marksObtained']);

        this.cutOff = finalObj.marksObtained;
        this.avreageTimeTakenByStudents = finalObj.timeTaken;

        ExamReturn.find({exam: this.exam}).count((error, totalStudentWhoAttemptedExam) => {
            if (error) return new Promise.reject(error);

            this.studentsAttempted = questionAnswers.length;

            var correctAnswerTimes = questionAnswers.map((questionAnswer) => {
                if (questionAnswer.isAnswerCorrect) return questionAnswer.timeTaken;
            });

            //correctanswerTimes.length number of students who attempted this question and got right

            this.avreageTimeTakenByStudentsWhoGotThisQuestionRight = _.reduce( correctAnswerTimes, (total, n) => total+n ) / correctAnswerTimes.length;

            this.percentageOfStudentWhoAttempted = questionAnswers.length * 100 / totalStudentWhoAttemptedExam;

            this.percentageOfStudentWhoAttemptedGotThisQuestionRight = correctAnswerTimes.length * 100 / totalStudentWhoAttemptedExam;
        });

    }).catch((error) => new Promise.reject(error));

    this.save().then((doc) => new Promise.resolve(doc)).catch((error) => new Promise.reject(error));    
};


const AggregateExamQuestionAnalysis = mongoose.model('AggregateExamQuestionAnalysis', AggregateExamQuestionAnalysisSchema);
module.exports = {AggregateExamQuestionAnalysis};