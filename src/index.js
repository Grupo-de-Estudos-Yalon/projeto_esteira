const express = require('express');
const app = express();

const PORT = 3000;

/**
 * Express middleware.
 */
// parses incoming requests with JSON payloads
app.use(express.json());
// parses incoming requests with urlencoded payloads
// extended: true - parsing the URL-encoded data with the querystring library
app.use(express.urlencoded({extended: true}));

/**
 * Routes.
 */
const usersRouter = require('./routes/playlist');

// Add this after the middleware part
app.use('/api', usersRouter);

function onStart(){
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

module.exports = app;
