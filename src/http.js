import axios from 'axios'
import Vue from 'vue';
import router from './router'
const http = axios.create({
    // baseURL : process.env.VUE_APP_API_URL || '/api'
    baseURL : 'http://localhost:3000/api'
})

// 设置拦截器，用来处理各种错误，全局提示
http.interceptors.response.use(res =>{
    return res
},err =>{
    // console.log(err.response.data)
    Vue.prototype.$message({
        type : 'error',
        message : err.response.data.message
    })

    if(err.response.status == 401){
        router.push('/login')
    }

    return Promise.reject(err)
})


// 把token注入请求头
http.interceptors.request.use(config =>{
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token 
    }
    return config
    
},err =>{
    return Promise.reject(err)
})



export default http