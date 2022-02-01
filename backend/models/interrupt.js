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
const interruptSchema = new mongoose.Schema({
  reason: String,
  successful: Boolean,
  startTime: Date,
  endTime: Date,
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }

})
interruptSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Interrupt',interruptSchema)