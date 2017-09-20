const crypto = require('crypto');
// Crypto is used to create the secret key (private key), it is inbuilt with nodejs

var env = process.env.NODE_ENV || 'development';

var config = {
    test: {
        PORT: 3000,
        db: 'FinalYearAppTest',
        MONGODB_URI: 'mongodb://localhost:27017/FinalYearAppTest',
        JWT_SECRET: crypto.randomBytes(256).toString('hex')
    },
    development: {
        PORT: 3000,
        db: 'FinalYearApp',
        MONGODB_URI: 'mongodb://localhost:27017/FinalYearApp',
        JWT_SECRET: crypto.randomBytes(256).toString('hex')
    }
}

if (env === 'development' || env === 'test') {
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}