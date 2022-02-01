require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const usersRouter = require('./controllers/users')
const tasksRouter = require('./controllers/tasks')
const categorysRouter = require('./controllers/categorys')
const interruptsRouter = require('./controllers/interrupts')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()
app.use(express.json())
app.use(cors())
morgan.token('data', function getId (req) {
  if (req.method==='POST'){
    return JSON.stringify(req.body)
  }
  else
    return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(middleware.userExtractor)
app.use(express.static('build'))

app.use(usersRouter)
app.use(tasksRouter)
app.use(interruptsRouter)
app.use(loginRouter)
app.use(categorysRouter)
app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

console.log(process.env.MONGODB_URI)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})