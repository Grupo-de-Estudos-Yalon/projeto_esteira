const router = require('express').Router();

router.route('/users/signup')
    .post(function(req, res){
        let user = new User()
        user.name = res.body.name
        user.username = res.body.username
        user.password = res.body.password
        user.save(function (err) {
            if (err) {
              // usuário duplicado
              if (err.code === 11000) {
                return res.json({
                  success: false,
                  message: 'Um usuário com esse username já existe.'
                })
              } else {
                return res.send(err)
              }
            }
            res.json({ message: 'Usuário criado!' })
          })
        })