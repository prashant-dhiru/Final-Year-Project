const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');

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
});

const Exam = mongoose.model('Exam', ExamSchema);
module.exports = {Exam};