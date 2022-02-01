const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const taskSchema = new mongoose.Schema({
  content: String,
  category: String,
  startTime: Date,
  interrupts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interrupt'
  }],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Task',taskSchema)