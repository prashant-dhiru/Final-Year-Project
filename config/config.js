//importing the keys from key file
const keys = require('./key');

//if prod or test, taking value from it, or if not, then development
var env = process.env.NODE_ENV || 'development';

//creating a config variable that contains configurations for development and test environments
var config = {
    test: {
        PORT: 3000,
        DB: 'FinalYearAppTest',
        MONGODB_URI: 'mongodb://localhost:27017/FinalYearAppTest',
        SESSION_KEY: keys.TestKey
    },
    development: {
        PORT: 3000,
        DB: 'FinalYearApp',
        MONGODB_URI: 'mongodb://localhost:27017/FinalYearApp',
        SESSION_KEY: keys.DevKey
    }
}

//implementing the config environment variable to be set as environment variables
if (env === 'development' || env === 'test') {
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}