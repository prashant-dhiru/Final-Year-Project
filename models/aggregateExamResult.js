const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {ExamReturn} = require('./examReturn');

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

// AggregateExamResultSchema.methods.calculateComparableData = function () {
    
//     var aggregateExamResult = this;
    
    
    
// };


// AggregateExamResultSchema.statics.calculateComparableData = function (examID) {
//     var AggregateExamResult = this;

//     return ExamReturn.find({exam: examID}).populate('questionAnswers').then((examReturns) => {
        
//         if (!examReturns)
//             return null;

//         var cutOff;
//         var studentsAttempted = examReturns.length;  //total student who attempted the exam
//         var totalQuestionAttempted;

//         examReturns.forEach ((examReturn) => {
//             cutOff = cutOff + examReturn.marksObtained;
//             totalQuestionAttempted = totalQuestionAttempted + examReturn.totalQuestionAttempted;
//         });

//         cutOff = cutOff / studentsAttempted;

//         var aggregateExamResult = new AggregateExamResult({ exam: examID, cutOff, studentsAttempted, averageQuestionsAttempted });

//         examReturns.forEach ((examReturn) => {
//             examReturn.questionAnswers.forEach ((questionAnswer) => {
//                 /* exam: question:  cutOff: avreageTimeTakenByStudents: 
//     avreageTimeTakenByStudentsWhoGotThisQuestionRight: percentageOfStudentWhoAttempted: 
//     percentageOfStudentWhoAttemptedGotThisQuestionRight: */

//     /* question: exam: timeTaken: answerSubmitted: isAnswerCorrect: marksObtained: */

            
//                 var temp = {};
//                 temp.exam = examID;
//                 temp.cutOff = temp.cutOff + questionAnswer.marksObtained; // divide by no of student
//                 temp.avreageTimeTakenByStudents = temp.avreageTimeTakenByStudents + questionAnswer.timeTaken;

//                 temp.percentageOfStudentWhoAttempted = examReturn.questionAnswers.length / ExamReturn.numberOfStudentsWhoAttemptedAQuestion(/*pass question id here*/) * 100;

//                 if (questionAnswer.isAnswerCorrect) {
//                     temp.avreageTimeTakenByStudentsWhoGotThisQuestionRight = temp.avreageTimeTakenByStudentsWhoGotThisQuestionRight + questionAnswer.timeTaken;

//                     // percentageOfStudentWhoAttemptedGotThisQuestionRight = 
//                 }

//             });
//         });


//             /*

//     request.body.questions.forEach(function(element) {
//         element.exam = exam._id;
//         var question = new MCQuestion(element);
//         exam.questions.push(question._id);
//         question.save().catch((error) => console.log(error));
//     }); */    
//     }).catch((error) => {
//         console.log(error);
//         return null;
//     });
//     //return type must be the final analysed populated document
// };



const AggregateExamResult = mongoose.model('AggregateExamResult', AggregateExamResultSchema);
module.exports = {AggregateExamResult};