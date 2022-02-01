const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()
usersRouter.post('/api/register', async (request, response) => {
  const body = request.body
  if(!body.username || !body.password || body.password.length<3){
    response.status(400).end()
  }
  else{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      passwordHash: passwordHash
    })
    const existingUser = await User.find({username:body.username})
    if(existingUser.length>0){
      return response.json({
        error: 'Username already used!'
      })
    }
    const result = await user.save()
    response.status(201).json(result)
  }
})
module.exports = usersRouter
