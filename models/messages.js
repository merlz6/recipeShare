const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messagesSchema = Schema({
  name:String,
  image:String,
  ingredients:[String],
  directions:String
})

const Message = mongoose.model('message', messagesSchema)

module.exports = Message
