//importing required packages installed by npm
const mongoose = require('mongoose');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

const ExamSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        uppercase: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    allowedTime: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    subject: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 604800
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MCQuestion' }]

    //'name', 'description', 'allowedTime', 'subject', 'questions', 'createdAt', '_id'

    //Schema definiton finishes here
});

/**
 * @param {any} this
 * document method
 */
ExamSchema.pre('save', function (next) {

    //converting the exam name into upper case
    this.name = this.name.toUpperCase();
    next();

    //method ends here
});

/**
 * @param {any} this
 * @param {String} id
 * document method
 */
ExamSchema.methods.addQuestionRef = function (id) {

    //pushing the id into the questions array
    this.questions.push(id);

    //returning this while saving it
    return this.save();

    //method ends here
};

const Exam = mongoose.model('Exam', ExamSchema);
module.exports = {Exam};