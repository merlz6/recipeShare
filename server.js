//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require('mongoose')
require('dotenv').config()
const app = express ();
const db = mongoose.connection;
const session = require('express-session')
//___________________
//Port
//___________________

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `foodieBlog`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))


const userController = require('./controllers/users.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)




//___________________
// Routes
//___________________

app.get('/' , (req, res) => {
  res.render('login.ejs', {
    currentUser: req.session.currentUser
});
});


app.get('/app', (req, res)=>{
  if(req.session.currentUser){
    res.send('BLOG PAGE')
  } else {
    res.redirect('/sessions/new')
  }

})




//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
