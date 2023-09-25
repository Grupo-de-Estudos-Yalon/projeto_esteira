let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config();


let PlaylistSchema = new mongoose.Schema({
    name: String,
    genero: String,
    altura: Number,
    embrazamento: Number,
    duration: Number,
    idSpotify: String
    
}, { timestamps: true });



module.exports = Playlist = mongoose.model('Playlist', PlaylistSchema);