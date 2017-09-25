const {key} = require('./key');

var env = process.env.NODE_ENV || 'development';

var config = {
    test: {
        PORT: 3000,
        db: 'FinalYearAppTest',
        MONGODB_URI: 'mongodb://localhost:27017/FinalYearAppTest',
        SESSION_KEY: key
    },
    development: {
        PORT: 3000,
        db: 'FinalYearApp',
        MONGODB_URI: 'mongodb://localhost:27017/FinalYearApp',
        SESSION_KEY: key
    }
}

if (env === 'development' || env === 'test') {
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}