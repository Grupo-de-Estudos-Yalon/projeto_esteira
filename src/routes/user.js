const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Utils = require("../utils/utils")
const querystring = require("querystring");
const url = require('url');
const axios = require('axios').default;
const SpotifyUtils = require ("../utils/spotifyUtils")


const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = "http://localhost:3000/api/user/callback"


router.route('/user/signup')
  .post(async function (req, res) {
    try {
      const name = req.body.name
      const username = req.body.username
      const password = req.body.password
      let user = new User({
        name: name,
        username: username,
        password: password
      });
      user.save()
      return res.json({ message: 'Usuário criado!' })
    }
    catch (error) {
      console.log(error)
      if (error.code === 11000) {
        return res.json({
          success: false,
          message: 'Um usuário com esse username já existe.'
        })
      } else {
        return res.send(error)
      }
    }

  }



  );

router.route('/user/login')
  .get(function (req, res) {

    var state = Utils.generateRandomString(16);
    var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

    try {

      res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));

    }
    catch (error) {
      console.log(error)
      res.send(error)
    }
  })
router.route('/user/callback')
  .get(async (req, res) => { 
    try {
      var code = req.query.code || null;
      var state = req.query.state || null;


      if (state === null) {
        res.redirect('/#' +
          querystring.stringify({
            error: 'state_mismatch'
          }));
      } else {
        var authOptions = {

          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
          },
          json: true
        };
      }
      const response = await axios.post(authOptions.url, authOptions.form,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
          },
          json: true,

        }
      ); 
     
      // Dados do Access token.
      const dados = response.data
      const token = dados.access_token
      const id = await SpotifyUtils.getUserId(token)
      const playlistId = await SpotifyUtils.CriarPlaylist(id, token)
      const tracks = await SpotifyUtils.buscarTitulosPorBPM(token)
      console.log(tracks.lenght)
      SpotifyUtils.adicionaMusicas(playlistId, token, tracks)
      
      res.json(dados);
    }
    catch (error) { console.log(error) };
  } 
  )













module.exports = router;