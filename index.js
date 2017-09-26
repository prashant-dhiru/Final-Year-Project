require('./config/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const router = express.Router();
const port = process.env.PORT || 3000;

const {mongoose} = require('./db/mongoose');

const app = express();

app.use(cors({origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/Client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use( session ({
	secret : process.env.SESSION_KEY,
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(require('./Routes/userRoutes'));
app.use(require('./Routes/adminRoutes'));
app.use(require('./Routes/examRoutes'));

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = {app};