//importing required packages installed by npm
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

const StudentSchema = new mongoose.Schema({
    
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
    },
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
    },
    address: {
        type: String,
        maxlength: 500,
        trim: true
    },
    studentClass: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true,
        uppercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8 //unencrypted max pass length 64
    }

    //'firstName', 'lastName', 'middleName', 'phoneNumber', 'email', 'studentClass', 'address', 'password', '_id'

    //Schema definiton finishes here
});

/**
 * @param {any} this 
 * @return {any}
 * document method
 * Overriding an existing function
 */
StudentSchema.methods.toJSON = function () {
    var student = this.toObject();
  
    //this will return all except password and __v, not whole student
    return _.pick(student, ['firstName', 'lastName', 'middleName', 'phoneNumber', 'email', 'studentClass', 'address', '_id']);
    //method finishes here
}; 

/**
 * @param {any} body {email, password}
 * @param {StudentSchema} this
 * @return {Promise} resolved if success, rejected if error
 * model method
 */
StudentSchema.statics.findByCredentials = function (body) {

    //finding a student by matching email (unique)
    return this.findOne({'email': body.email}).then((student) => {
        
        // if no student found, reject request with message
        if (!student) return Promise.reject('No one found');

        //preparing promise to return for student found
        return new Promise((resolve, reject) => {

            //comparing passwords with passed password
            bcrypt.compare(body.password, student.password, (error, response) => {
                
                //if any response resolve with student
                if (response) resolve(student);
                
                //if no response, 
                else reject(error);

            });
        });
    })/*Handling any potential error that may occur during finding student
    */.catch((error) => Promise.reject(error));
    //method finishes here
};

/**
 * @param {any} this
 * document method
 */
StudentSchema.pre('save', function (next) {

    //if password isn't modified, don't ncrypt the password
    if (!this.isModified('password')) return next();

    //doing 10 rounds of salting for making the function slower
    bcrypt.genSalt(10, (error, salt) => {

        //sticking wth good condition, no error checking
        bcrypt.hash(this.password, salt, (error, hash) => {
            
            //sticking wth good condition, no error checking
            this.password = hash;
            next();
        });
    });

    //converting the class property to uppercase
    this.studentClass = this.studentClass.toUpperCase();
    //method ends here
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = {Student};