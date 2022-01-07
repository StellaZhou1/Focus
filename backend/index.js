const express = require('express')
const app = express()

let tasks = [
    {
      id: 1,
      content: "Full stack open",
      category: "Coding"
    },
    {
        id: 2,
        content: "Academic communication",
        category: "Essay"
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/tasks', (request, response) => {
  response.json(tasks)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})