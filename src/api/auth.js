import axios from '@/api/axios'

const register = (credencials) => {
  return axios.post('/users', {user: credencials})
}

const login = (credencials) => {
  return axios.post('/users/login', {user: credencials})
}
const getCurrentUser = () => {
  return axios.get('/user')
}

export default {
  register,
  login,
  getCurrentUser
}
