//importing configurations files
require('./config/config');

//importing required packages installed by npm
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
//passing the session as required by MongoStore
const MongoStore = require('connect-mongo')(session);

//creating router to use external routes
const router = express.Router();

//importing the mongoose with connection
const {mongoose} = require('./db/mongoose');

//creating an app by express
const app = express();

//usin application middlewares
app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/Client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use( session ({
	secret : process.env.SESSION_KEY,
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//using external routes
app.use(require('./Routes/userRoutes'));
app.use(require('./Routes/adminRoutes'));
app.use(require('./Routes/examRoutes'));

//serving the home page
app.get('/', (request, response) => {
    response.send('Hello World!');
});

//listening the app
app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`);
});

//exporting app for testing purpose
module.exports = {app};