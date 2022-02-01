const Interrupt = require('../models/interrupt')
const Task = require('../models/task')
const interruptsRouter = require('express').Router()
const mongoose = require('mongoose')
interruptsRouter.post('/api/tasks/:id/interrupts', async (request, response) => {
  const body = request.body
  const interrupt = Interrupt({
    reason: body.reason,
    successful: body.successful,
    startTime: new Date(),
    task:request.params.id
  })
  const result = await interrupt.save()
  const task = await Task.findById(request.params.id)
  task.interrupts = task.interrupts.concat(result._id)
  await task.save()
  response.status(201).json(result)
})
  
interruptsRouter.get('/api/tasks/:id/interrupts', async (request, response) => {
  const result = await Interrupt.find({task:request.params.id})
  response.json(result)
})
  
interruptsRouter.delete('/api/tasks/:taskid/interrupts/:interruptid', async (request, response) => {
  await Interrupt.findByIdAndRemove(request.params.interruptid)
  await Task.findByIdAndUpdate(request.params.taskid, 
    { $pull: { interrupts: mongoose.Types.ObjectId(request.params.interruptid) } }, 
    { new: true }
  )
  response.status(204).end()
})
  
interruptsRouter.put('/api/tasks/:taskid/interrupts/:interruptid', async (request, response) => {
  const body = request.body
  const interrupt = {
    reason: body.reason,
    successful: body.successful
  }
  const updatedInterrupt = await Interrupt.findByIdAndUpdate(request.params.interruptid, interrupt, { new: true })
  response.json(updatedInterrupt)
})

interruptsRouter.get('/api/interrupts/:id', async (request, response) => {
  const result = await Interrupt.findById(request.params.id)
  response.json(result)
})

module.exports = interruptsRouter