import axios from 'axios'

const baseUrl = '/api/tasks'//'http://localhost:3001/api/tasks'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl,config)
  return response.data
}

const createNew = async (content, category) => {
  const config = {
    headers: { Authorization: token }
  }
  const startTime = new Date()
  const object = {
    content: content,
    category: category,
    startTime: startTime
  }
  const response = await axios.post(baseUrl, object, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}

const edit = async (id, content, category) => {
  const config = {
    headers: { Authorization: token }
  }
  const object = {
    content: content,
    category: category
  }
  const response = await axios.put(`${baseUrl}/${id}`, object, config)
  return response.data
}

const findById = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`${baseUrl}/${id}`,config)
  return response.data
}

export default { getAll, createNew, setToken, remove, edit, findById }