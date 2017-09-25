const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const StudentSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            maxlength: 15,
            required: true,
            trim: true
        },
        middleName: {
            type: String,
            maxlength: 15,
            trim: true
        },
        lastName: {
            type: String,
            maxlength: 15,
            required: true,
            trim: true
        }
    },
    contact: {
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
            maxlength: 14,
            validate: {
                validator: value => validator.isMobilePhone(value, 'en-IN'),
                message: '{VALUE} is not a Valid Phone Number.'
            }
        },
        email: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
            unique: true,
            validate: {
                validator: value => validator.isEmail(value),
                message: '{VALUE} is not a Valid Email.'
            }
        }
    },
    rollNumber: {
        type: Number,
        unique: true,
        maxlength: 15,

    },
    branch: {
        type: String,
        required: true,
        maxlength: 10,

    },
    password: {
        type: String,
        required: true,
        minlength: 8, //unencrypted max pass length 64
    }
});

StudentSchema.methods.toJSON = function () {
    var student = this.toObject();
  
    return _.pick(student, ['_id', 'email']);
};  //final  

StudentSchema.statics.findByCredentials = function (body) {
    var Student = this;

    return Student.findOne({'contact.email': body.email}).then((student) => {
        if (!student)
            return Promise.reject('No one found');

        return new Promise((resolve, reject) => {
            bcrypt.compare(body.password, student.password, (error, response) => {
                if (response) 
                    resolve(student);
                else 
                    reject(error);
            });
        });
    }).catch((error) => Promise.reject(error));

};

StudentSchema.pre('save', function (next) {
    var student = this;

    if (!student.isModified('password'))
        return next();
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(student.password, salt, (error, hash) => {
            student.password = hash;
            next();
        });
    });
}); //final

const Student = mongoose.model('Student', StudentSchema);

module.exports = {Student};