


module.exports = app => {
    const express = require('express')
    const router = express.Router(
        {mergeParams : true}
    )
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    


     //创建adminuser
     router.post('/', async (req,res)=>{
        const modelis = await AdminUser.findOne({username : req.body.username}) 
        let model
        if(modelis){
            model = await AdminUser.findOneAndUpdate({username : req.body.username}, req.body,{ new: true })
        }else{
            model = await AdminUser.create(req.body)
        }
        res.send(model)
    })

    //删除adminuser
    router.delete('/:no', async (req,res)=>{
        const model = await AdminUser.findOneAndRemove({no : req.params.no})
        res.send(model)
    })
    
    //修改adminuser
    router.put('/', async (req,res)=>{
        console.log(req.body)
        const model = await AdminUser.findOneAndUpdate({no : req.body.no}, req.body,{ new: true })
        res.send(model)
    })

    //获取adminuser 列表
    router.get('/', async (req,res)=>{
        const items = await AdminUser.find().limit(50)
        res.send(items)
    })

    //adminuser no
    router.get('/:no', async (req,res)=>{
        const model = await AdminUser.findOne({no : req.params.no})
        res.send(model)
    })

    app.use('/api/adminusers/', router)

 
    // 登陆路由
    app.post('/api/login',async (req,res)=>{
        const {username,password} = req.body
        // 1.根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password')     //用select就可以直接取出来   简写 等效于 username : username
        assert(user,422,'用户不存在')    //必须要express用 5.0否则不支持异常处理

        // 2.校验密码
        const isValid = require('bcrypt').compareSync(password,user.password)
        assert(isValid,422,'密码错误')

        

        // 3.返回token
        const jwt = require('jsonwebtoken')
        // create token
        const token = jwt.sign({id:user._id},'wodetokenstr')
        res.send({token})
      
    })



    // app.use( async (err,req,res,next)=>{
    //     res.status(err.statusCode || 500).send({
    //         message : err.message
    //     })
    // })
}