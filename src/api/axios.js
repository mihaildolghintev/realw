import axios from 'axios'
import {getItem} from "@/helpers/persistenceStorage";

axios.defaults.baseURL = 'https://conduit.productionready.io/api'
axios.interceptors.request.use(config => {
  const token = getItem('accessToken')
  config.headers.Authorization = token ? `Token ${token}` : ''
  return config
})

export default axios
