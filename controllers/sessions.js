const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js');
const Message = require('../models/messages.js');

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
})

sessions.get('/recipeNew', (req, res) => {
  res.render('recipeNew.ejs')
})


sessions.post('/', (req, res)=>{
  Message.create(req.body, (err, createdMessage) => {
      })
    res.render('./app/blog.ejs', {
      messages: Message
    })

});


sessions.post('/', (req, res)=>{
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      console.log(req.body.password, foundUser.password)
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
          req.session.currentUser = foundUser
            res.render('./app/blog.ejs')
        } else {
          res.send('<a href="/">wrong password</a>')
        }
    });
});







module.exports = sessions
