require('../config/config');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
}).then(() => {
    console.log('Successfully connected to database: ' + process.env.db);
}, (error) => {
    console.log('Unable to connect to database: ' + error.message);
});

module.exports = {mongoose};