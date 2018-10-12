const bcrypt = require('bcrypt')
const express = require('express')
const user = express.Router()
const User = require('../models/users.js') // our model

user.get('/new', (req, res) => {
  res.render('users/new.ejs')
})

user.post('/', (req, res) => {
  console.log('before bcrypt: ' + req.body.password )
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  console.log('before bcrypt: ' + req.body.password )
  User.create(req.body, (err, createdUser) => {


    if (err) {
      console.log(err)
    }
    console.log(createdUser);
    res.redirect('/')
  })
})



module.exports = user
