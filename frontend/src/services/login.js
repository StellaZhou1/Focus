import axios from 'axios'
const baseUrl = '/api/login'
//'http://localhost:3001/api/login'
const login = async ({ username,password }) => {
  const body = {
    username: username,
    password: password
  }
  const response = await axios.post(baseUrl,body)
  return response.data

}
export { login }