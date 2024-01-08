const express = require('express');
const app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://grupoestudos:grupoestudos132@projeto-esteira.97erjdm.mongodb.net/?retryWrites=true&w=majority');
require('./models/User')

const PORT = 3000;


app.use(express.json());

app.use(express.urlencoded({extended: true}));


const playlistRouter = require('./routes/playlist');
const usersRouter = require('./routes/user')
app.use('/api', playlistRouter);
app.use('/api', usersRouter)
function onStart(){
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

module.exports = app;
