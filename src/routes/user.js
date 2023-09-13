const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/User');
const { MongoUnexpectedServerResponseError } = require('mongodb');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.route('/users/signup')
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

router.route('/users/login')
  .get(async function (req, res) {
    try {


      const user = await User.findOne({ username: req.body.username }).exec();
      console.log(user)

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
        console.log(passwordIsValid)
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id },
        process.env.JWT_SECRET,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });
      res.status(200).send(token)


    }
    catch (error) {
      console.log(error)
      res.send(error)
    }
  }
  )


module.exports = router;