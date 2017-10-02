//importing required packages installed by npm
const mongoose = require('mongoose');
const validator = require('validator');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

const ExamSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 500
    },
    allowedTime: {
        type: Number,
        required: true,
        minlength: 1
    },
    subject: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MCQuestion' }]

    //'name', 'description', 'allowedTime', 'subject', 'questions', '_id,

    //Schema definiton finishes here
});

const Exam = mongoose.model('Exam', ExamSchema);
module.exports = {Exam};