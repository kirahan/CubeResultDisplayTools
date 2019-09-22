module.exports = app => {
    const express = require('express')
    const router = express.Router(
        {mergeParams : true}
    )
    const Result = require('../../models/Result')

//创建player
    router.post('/', async (req,res)=>{
        const modelis = await Result.findOne({id : req.body.id,item : req.body.item,round : req.body.round}) 
        let model
        if(modelis != null && modelis != {} && modelis != undefined){
            model = await Result.findOneAndUpdate({no : req.body.no}, req.body,{ new: true })
        }else{
            model = await Result.create(req.body)
        }
        res.send(model)
    })

    //删除player
    router.delete('/', async (req,res)=>{
        const model = await Result.db.dropCollection('results')
        res.send(model)
    })

    //删除特定 项目成绩
    router.post('/delete', async (req,res)=>{
        const model = await Result.findOneAndDelete({id : req.body.id,round : req.body.round, item : req.body.item})
        res.send(model)
    })
    
    // //修改player
    // router.put('/', async (req,res)=>{
    //     console.log(req.body)
    //     const model = await Result.findOneAndUpdate({no : req.body.no}, req.body,{ new: true })
    //     res.send(model)
    // })

    //获取player 列表
    router.get('/', async (req,res)=>{
        const items = await Result.find().limit(50)
        res.send(items)
    })

    // //查询player no
    // router.get('/:no', async (req,res)=>{
    //     const model = await Result.findOne({no : req.params.no})
    //     res.send(model)
    // })

    app.use('/api/results/', router)
}