let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
require('dotenv').config();



let UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    altura: Number,
    playlists: [],
    spotifyId : String 


}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'Já está em uso.' });

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = User = mongoose.model('User', UserSchema)