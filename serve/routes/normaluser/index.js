module.exports = app => {
    const express = require('express')
    const router = express.Router(
        {mergeParams : true}
    )
    const NormalUser = require('../../models/NormalUser')
    const assert = require('http-assert')
    


     //创建NormalUser
     router.post('/', async (req,res)=>{
        const modelis = await NormalUser.findOne({username : req.body.username}) 
        let model
        if(modelis){
            model = await NormalUser.findOneAndUpdate({username : req.body.username}, req.body,{ new: true })
        }else{
            model = await NormalUser.create(req.body)
        }
        res.send(model)
    })

    //删除NormalUser
    router.delete('/:no', async (req,res)=>{
        const model = await NormalUser.findOneAndRemove({no : req.params.no})
        res.send(model)
    })
    
    //修改NormalUser
    router.put('/', async (req,res)=>{
        const model = await NormalUser.findOneAndUpdate({no : req.body.no}, req.body,{ new: true })
        res.send(model)
    })

    //获取NormalUser 列表
    router.get('/', async (req,res)=>{
        const items = await NormalUser.find().limit(50)
        res.send(items)
    })

    //NormalUser no
    router.get('/:no', async (req,res)=>{
        const model = await NormalUser.findOne({no : req.params.no})
        res.send(model)
    })

    app.use('/api/normalusers/', router)

 
    // 登陆路由
    app.post('/api/login',async (req,res)=>{
        const {username,password} = req.body
        // 1.根据用户名找用户
        const user = await NormalUser.findOne({username}).select('+password')     //用select就可以直接取出来   简写 等效于 username : username
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
}