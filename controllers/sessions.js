const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js');
const Message = require('../models/messages.js');




sessions.post('/', (req, res)=>{
  Message.create(req.body, (err, createdMessage) => {
      })
      Message.find({}, (error, allMessages) => {
    res.render('./app/blog.ejs', {
      Messages: allMessages
    })

})
});


sessions.get('/', (req, res) => {
  Message.find({}, (error, Messages) => {
    res.render('./app/blog.ejs', {
      Messages: Messages
    })
  })

})


sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
})

sessions.get('/recipeNew', (req, res) => {
  res.render('recipeNew.ejs')
})






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

sessions.delete('/:id', (req, res) => {
    Message.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/sessions');
    });
});







module.exports = sessions
