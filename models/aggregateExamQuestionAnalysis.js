//importing required packages installed by npm
const mongoose = require('mongoose');

//for depricated Promise of mongoose
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
    studentsAttempted: {
        type: Number,
        default: 0
    }

    // 'exam', 'question', 'cutOff', 'avreageTimeTakenByStudents', 'studentsAttempted', '_id', '__v'
});

const AggregateExamQuestionAnalysis = mongoose.model('AggregateExamQuestionAnalysis', AggregateExamQuestionAnalysisSchema);
module.exports = {AggregateExamQuestionAnalysis};


/**
// 
//  * @param {any} this
//  * @return {Promise} calculateComparableQuestionDataByDocument
//  * resolved with instance of this model if success, rejected with error if error
//  * Document Method
//  
AggregateExamQuestionAnalysisSchema.methods.calculateComparableQuestionDataByDocument = function () {
    
    // this = aggregateExamQuestionAnalysis;
    //questionAnswers.length number of students who attempted this question

    // console.log('This reference: ', this);
    aggregateExamQuestionAnalysis = this;

    //finding Submitted answers of this exam and question
    return QuestionAnswer.find({exam: aggregateExamQuestionAnalysis.exam, question: aggregateExamQuestionAnalysis.question}).select('isAnswerCorrect marksObtained timeTaken -_id').then(function (questionAnswers) {
        
        if (questionAnswers.length === 0) return Promise.reject();

        //calculating values for these two keys
        aggregateExamQuestionAnalysis.cutOff = pluckAndReduce(questionAnswers, 'marksObtained');
        aggregateExamQuestionAnalysis.avreageTimeTakenByStudents = pluckAndReduce(questionAnswers, 'timeTaken');

        //total students who attempted this question
        aggregateExamQuestionAnalysis.studentsAttempted = questionAnswers.length;

        //further calculation requires total number of students who attempted the exam
        //finding the total number of students wo attempted the exam
        return ExamReturn.find({exam: aggregateExamQuestionAnalysis.exam}).count(function (error, totalStudentWhoAttemptedExam) {

            //handling any potential errors
            if (error) return Promise.reject(error);
            if (totalStudentWhoAttemptedExam === 0) return Promise.reject();

            //calculating percentages based keys here
            aggregateExamQuestionAnalysis.percentageOfStudentWhoAttempted = questionAnswers.length * 100 / totalStudentWhoAttemptedExam;
            
            //last two value requires the average times taken by students who got this question right
            //mapping queestions answers to find the Answer which are correct and array of time taken
            var correctAnswerTimes = questionAnswers.map((questionAnswer) => {
                if (questionAnswer.isAnswerCorrect) return questionAnswer.timeTaken;
            });

            //correctanswerTimes.length number of students who attempted this question and got right

            aggregateExamQuestionAnalysis.percentageOfStudentWhoAttemptedGotThisQuestionRight = correctAnswerTimes.length * 100 / totalStudentWhoAttemptedExam;

            aggregateExamQuestionAnalysis.avreageTimeTakenByStudentsWhoGotThisQuestionRight = _.reduce( correctAnswerTimes, (total, n) => total+n ) / correctAnswerTimes.length;

            //saving the document, returning the promise
            return aggregateExamQuestionAnalysis.save();
        });

        //handling any potential errors
    }, (error) => Promise.reject(error));

    //method finishes here
};


const AggregateExamQuestionAnalysis = mongoose.model('AggregateExamQuestionAnalysis', AggregateExamQuestionAnalysisSchema);
module.exports = {AggregateExamQuestionAnalysis};
 */