//importing required packages installed by npm
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

//for depricated Promise of mongoose
mongoose.Promise = global.Promise;

//creating a student Schema, later to be converted to model
const StudentSchema = new mongoose.Schema({
    
    //giving student a name field, with three subfields (first, middle and last name)
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

    //giving student a contact field, which will store all its contacts, ways to reach the student
    // primarly email, phone, and residential address
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
        },
        address: {
            type: String,
            maxlength: 500
        }
    },

    //giving student a password field, to store its password
    password: {
        type: String,
        required: true,
        minlength: 8, //unencrypted max pass length 64
    }
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
  
    //this will return only id and email,not while student
    return _.pick(student, ['_id', 'contact.email']);
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
    return this.findOne({'contact.email': body.email}).then((student) => {
        
        // if no student found, reject request with message
        if (!student) return Promise.reject('No one found');

        //preparing promise to return for student found
        return new Promise((resolve, reject) => {

            //comparing passwords with passed password
            bcrypt.compare(body.password, student.password, (error, response) => {
                //if any error in matching password, reject with error
                if (error) reject(error);
                //else return the student found
                else resolve(student);
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

    //doing 23 rounds of salting for making the function slower
    bcrypt.genSalt(23, (error, salt) => {
        //sticking wth good condition, no error checking
        bcrypt.hash(this.password, salt, (error, hash) => {
            //sticking wth good condition, no error checking
            this.password = hash;
            next();
        });
    });
    //method ends here
});

//making model from Schema, with Student name
const Student = mongoose.model('Student', StudentSchema);
//exporting the Model
module.exports = {Student};