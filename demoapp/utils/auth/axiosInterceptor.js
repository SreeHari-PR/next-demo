
import axios from 'axios'
import { useSelector } from 'react-redux'

const axiosInstance = axios.create({
  baseURL:'	https://dev.zynact.com/api/profitex',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json'
  }
})

const requestInterceptor = (config) => {
  const token = useSelector((state) => state.auth.token)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
   return config
}

const responseInterceptor = (response) => {
  return response.data
}
axiosInstance.interceptors.request.use(
  requestInterceptor, 
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  responseInterceptor, 
)
export default axiosInstance
