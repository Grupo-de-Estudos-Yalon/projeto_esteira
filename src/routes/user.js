const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/User')


router.route('/users/signup')
  .post(async function (req, res) {
    try {
      const name = req.body.name
      const username = req.body.username
      const password = req.body.password
      let user = await User.create({
        name: name,
        username: username,
        password: password
      });
      console.log(user)
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

module.exports = router;