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

sessions.get('/randomRecipe', (req, res) => {
  Message.find({}, (error, Messages) => {
    res.render('./app/randomShow.ejs', {
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




sessions.get('/:id', (req, res) => {
    Message.findById(req.params.id, (err, foundMessage) => {
        res.render('./app/show.ejs', {
            message: foundMessage
        });
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


sessions.put('/:id', (req, res) => {
  Message.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
        res.redirect('/sessions')
  })

})




sessions.get('/:id/edit', (req, res) => {
  Message.findById(req.params.id, (err, foundMessage) => {
    //db needs to be called before rendering page
    res.render('edit.ejs', {
      message: foundMessage
    })
  })

})



sessions.delete('/:id', (req, res) => {
    Message.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/sessions');
    });
});







module.exports = sessions
