module.exports = app => {
    const express = require('express')
    const router = express.Router(
        {mergeParams : true}
    )
    const VeriCode = require('../../models/VeriCode')
    const uuidv4 = require('uuid/v4')


    
    // // 短信验证码中间件
    const veriCodeMiddleware = require('../../middleware/alisms')



    //创建一个记录
    router.post('/',veriCodeMiddleware(),async (req,res)=>{
        if(req.smsali){
            const backdata = {
                uuid : uuidv4(),
                phone : req.body.phone,
                code : req.smscode
            }
            const model = await VeriCode.create(backdata)
            res.send(model)
        }else{
            res.send({err : '错误'})
        }
        // const backdata = 
        
        
        
    })

    //删除全部
    router.delete('/', async (req,res)=>{
        const model = await VeriCode.db.dropCollection()
        res.send(model)
    })

    //获取某一个uuid的最近记录
    router.get('/:id', async (req,res)=>{
        const item = await VeriCode.findOne({uuid : req.params.id})
        res.send(item)
    })

    //获取一个最近记录
    router.get('/', async (req,res)=>{
        const item = await VeriCode.findOne()
        res.send(item)
    })


    app.use('/api/vericode/', router)
}