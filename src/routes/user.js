const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Utils = require("../utils/utils")
const querystring = require("querystring");
const url = require('url');
const axios = require('axios').default;


const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = "http://localhost:3000/api/user/callback"

router.route('/user/signup')
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

      // const user = await User.findOne({ username: req.body.username }).exec();
      // console.log(user)

      // let passwordIsValid = bcrypt.compareSync(
      //   req.body.password,
      //   user.password
      // );
      // console.log(passwordIsValid)
      // if (!passwordIsValid) {
      //   return res.status(401).send({ message: "Invalid Password!" });
      // }

      // const token = jwt.sign({ id: user.id },
      //   process.env.JWT_SECRET,
      //   {
      //     algorithm: 'HS256',
      //     allowInsecureKeySizes: true,
      //     expiresIn: 86400, // 24 hours
      //   });
      // res.status(200).send(token)


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

      console.log(code)

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
      ); const dados = response.data
      const id = await getUserId(dados)
      CriarPlaylist(id, token)
      
      AdicionarPorBPM()
      //Chamar a função que retorna o id do usuário e associá-la ao usuário no banco de dados
      res.json(response.data);
    }
    catch (error) { console.log(error) };
  }
  )

// Lógica post para pegar a informações do usuário:
async function getUserId(dados) {
  try {
    token = dados.access_token
    const response = await axios.get(`https://api.spotify.com/v1/me `,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    id = response.data.id;
    return id;
  } catch (error) {
    console.error(error);
  }
}

async function CriarPlaylist(id, token) {

  try {

    const data = {
      name: "Biggie Smalls Greatest Hits",
      description: "All I do Is Separate the game from the truth",
      public: true
    }
    const response = await axios.post(`https://api.spotify.com/v1/users/${id}/playlists
          `, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
console.log(response.data)
  } catch (error) {
    console.error(error);
  }
}

// ( passar o access token e recuperar o id)
// com o id recuperado, o passamos para uma variável id 
//quando formos criar a playlist, a rota vai rota vai ser /users/{user_id}/playlists





module.exports = router;