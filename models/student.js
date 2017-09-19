const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
    /*name,  */

    /*email: {
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
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        trim: true,
        unique: true,
        validate: {
            validator: value => validator.isAlphanumeric(value),
            message: '{VALUE} is not a valid username'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8, //unencrypted max pass length 64
    } ,
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }] */
});


/*
const jwt = require('jsonwebtoken');
const _ = require('lodash');



UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {

    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });

};

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return Promise.reject(error);
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

StudentSchema.statics.findByCredentials = function (body) {
    var Student = this;

    return User.findOne({email: body.email, username: body.username}).then((user) => {
        if (!user)
            return Promise.reject();
        
        return new Promise((resolve, reject) => {
            bcrypt.compare(body.password, user.password, (error, response) => {
                if (response) 
                    resolve(user);
                else 
                    reject(error);
            });
        });
    }).catch((error) => Promise.reject(error));
};
*/
StudentSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password, (error, response) => {
        if (error) 
            return false;
        return true;
    });
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
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = {Student};