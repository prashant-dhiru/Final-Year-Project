//importing required packages installed by npm
const mongoose = require('mongoose');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

//importing other models from model directory to be used in methods
const {Exam} = require('./exam');

const ExamReturnSchema = new mongoose.Schema({

    questionAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionAnswer' }],
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    totalTimeTaken: {
        type: Number,
        minlength: 1,
        maxlength: 3
    },
    totalQuestionAttempted: {
        type: Number
    },
    totalQuestionNotAttempted: {
        type: Number
    },
    percentageOfQuestionAttempted: {
        type: Number
    },
    percentageOfQuestionNotAttempted: {
        type: Number
    },
    marksObtained: {
        type: Number,
        default: 0
    }

    //'questionAnswers', 'exam', 'user', 'totalTimeTaken', 'totalQuestionAttempted', 'totalQuestionNotAttempted','percentageOfQuestionAttempted', 'percentageOfQuestionNotAttempted', 'marksObtained', '_id'

    //Schema definiton finishes here
});

/**
 * @param {ExamReturn} this
 * @return {Number} numberOfStudentsWhoAttemptedAQuestion
 * Model Method
 */
ExamReturnSchema.statics.numberOfStudentsWhoAttemptedAQuestion = function (questionId) {
    
    //this function returns number of students who attempted a particular question irrespectively of exam and users
    return this.find({}).where('questionAnswers').in([questionId]).count((error, number) => {
        if (error) return -1;
            return count;
    });

    //method ends here
};

/**
 * @param {any} this
 * document method
 */
ExamReturnSchema.pre('save', function (next) {

    //finding the exam and selecting its questions value
    Exam.findById(this.exam).select('questions').exec((error, questions) => {

        //handing any potential error that may occured during exam searching and returning error with next
        if(error) return next(error);

        //using questions.questions.length because a nested object is returned

        //calculating values and assigning them to document
        this.totalQuestionNotAttempted = questions.questions.length - this.totalQuestionAttempted;
        this.percentageOfQuestionAttempted = this.totalQuestionAttempted * 100 / questions.questions.length;
        this.percentageOfQuestionNotAttempted = this.totalQuestionNotAttempted * 100 / questions.questions.length;
        
        //calling next to finish the method execution
        next();
    });

    //method ends here
});


const ExamReturn = mongoose.model('ExamReturn', ExamReturnSchema);
module.exports = {ExamReturn};