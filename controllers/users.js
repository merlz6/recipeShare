const bcrypt = require('bcrypt')
const express = require('express')
const user = express.Router()
const User = require('../models/users.js') // our model
const Message = require('../models/messages.js');


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

user.delete('/:id', (req, res) => {
    Message.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/sessions');
    });
});



module.exports = user
