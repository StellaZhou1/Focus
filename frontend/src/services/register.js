import axios from 'axios'
const baseUrl = '/api/register'
//'http://localhost:3001/api/register'
const register = async (username,password) => {
  const body = {
    username: username,
    password: password
  }
  const response = await axios.post(baseUrl,body)
  return response.data

}
export { register }