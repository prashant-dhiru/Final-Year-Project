//importing required packages installed by npm
var mongoose = require('mongoose');

//for deprecated mongoose Promise
mongoose.Promise = global.Promise;

//connecting to the database, as database uri set in Environment variable
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}).then(() => {
    //success case
    console.log('Successfully connected to database: ' + process.env.db);
    //error case
}, (error) => console.log(error.message));

//exporting mongoose with the connection
module.exports = {mongoose};