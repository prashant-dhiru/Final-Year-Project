const port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
require('./config/config');
const mongoose = require('./db/mongoose');

const app = express();

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});