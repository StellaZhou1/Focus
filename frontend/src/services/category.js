import axios from 'axios'

const baseUrl = '/api/categorys'//'http://localhost:3001/api/categorys'
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

const createNew = async (name) => {
  const config = {
    headers: { Authorization: token }
  }
  const object = {
    name: name
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


export default { getAll, createNew, setToken, remove }