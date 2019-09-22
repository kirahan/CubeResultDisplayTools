module.exports = app => {
    const express = require('express')
    const router = express.Router(
        {mergeParams : true}
    )
    const Player = require('../../models/Player')

    //创建player
    router.post('/', async (req,res)=>{
        const modelis = await Player.findOne({no : req.body.no}) 
        let model
        if(modelis != null && modelis != {} && modelis != undefined){
            model = await Player.findOneAndUpdate({no : req.body.no}, req.body,{ new: true })
        }else{
            model = await Player.create(req.body)
        }
        res.send(model)
    })

    //删除player
    router.delete('/:no', async (req,res)=>{
        const model = await Player.findOneAndRemove({no : req.params.no})
        res.send(model)
    })
    
    //修改player
    router.put('/', async (req,res)=>{
        console.log(req.body)
        const model = await Player.findOneAndUpdate({no : req.body.no}, req.body,{ new: true })
        res.send(model)
    })

    //获取player 列表
    router.get('/', async (req,res)=>{
        const items = await Player.find().limit(50)
        res.send(items)
    })

    //查询player no
    router.get('/:no', async (req,res)=>{
        const model = await Player.findOne({no : req.params.no})
        res.send(model)
    })
    app.use('/api/players/', router)
}