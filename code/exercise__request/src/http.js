import axios from 'axios'

const client = axios.create({
  baseURL: 'https://www.example.com'
})

client.interceptors.response.use(
  res => res.data,
  error => error
)

export default client