const Task = require('../models/task')
const tasksRouter = require('express').Router()

tasksRouter.get('/api/tasks', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const result = await Task.find({user:user._id})
  response.json(result)
})
  
tasksRouter.post('/api/tasks', async (request, response) => {
  const body = request.body
  if(!body.content && !body.category){
    response.status(400).end()
  }
  else{
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const task = new Task({
      content: body.content,
      category: body.category,
      startTime: body.startTime,
      user:user._id
    })
    const result = await task.save()
    response.status(201).json(result)
  }
})

tasksRouter.get('/api/tasks/:id', async (request, response) => {
  const taskFound = await Task.findById(request.params.id)
  if (taskFound)
    response.json(taskFound)
  else
    response.status(404).end()
})

tasksRouter.delete('/api/tasks/:id', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const taskFound = await Task.findById(request.params.id)
  if (user._id.toString()!==taskFound.user.toString()){
    return response.status(401).json({ error: 'current user is not owener of the task' })
  }
  await Task.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

tasksRouter.put('/api/tasks/:id', async (request, response) => {
  const body = request.body
  const task = {
    content: body.content,
    category: body.category
  }
  const updatedTask = await Task.findByIdAndUpdate(request.params.id, task, { new: true })
  response.json(updatedTask)
})

module.exports = tasksRouter