const Category = require('../models/category')
const categorysRouter = require('express').Router()
categorysRouter.get('/api/categorys', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const result = await Category.find({user:user._id})
  response.json(result)
})
  
categorysRouter.post('/api/categorys', async (request, response) => {
  const body = request.body
  if(!body.name){
    response.status(400).end()
  }
  else{
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const category = new Category({
      name: body.name,
      user:user._id
    })
    const result = await category.save()
    response.status(201).json(result)
  }
})


categorysRouter.delete('/api/categorys/:id', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const categoryFound = await Category.findById(request.params.id)
  if (user._id.toString()!==categoryFound.user.toString()){
    return response.status(401).json({ error: 'current user is not owener of the category' })
  }
  await Category.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = categorysRouter