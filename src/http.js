import axios from 'axios'

const http = axios.create({
    // baseURL : process.env.VUE_APP_API_URL || '/api'
    baseURL : 'http://localhost:3000/api'
})

export default http