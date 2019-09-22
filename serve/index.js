const express = require('express')
const app = express()


var server = require('http').Server(app);
var io = require('socket.io')(server);

//socket 设置为3000端口
server.listen(4000);

// 将manager目录设置成静态文件目录
// app.use(express.static('manager'));
// app.use(express.static('visitors'));
// app.use('/static', express.static('public'));



//跨域中间件
app.use(require('cors')())

//json中间件
app.use(express.json())

// 挂载db
require('./plugins/db')(app)

//挂载app
// require('./routes/web_manager')(app)
// require('./routes/translate')(app)
require('./routes/player')(app)

//app 设置为3000端口
app.listen(3000,() =>{
    console.log('3000 is listening')
})

let m_socket_client = ''

io.on('connection', client => {
    console.log('there is one socket client connected') 

    // ---------------------------------------init---------------------------------------------------------------
    //stage_handshake
    client.on('handshake-stage',()=>{
      client.emit('handshake_server_to_stage',client.id)
    })

    //stage_heart
    // 同时不断吧stage的状态发送给服务器
    client.on('heartbeat-stage',(data)=>{
      io.emit('heartbeat_server_to_stage',data)
    })

    //manager_handshake
    //同时保存manager的client，方便直接给manager发送信息
    client.on('handshake-manager',()=>{
      client.emit('handshake_server_to_manager',client.id)
    })

    //manager_heart
    client.on('heartbeat-manager',(data)=>{
      client.emit('heartbeat_server_to_manager',data)
    })
  
    // --------------------------command--------------------------------------------------------------------------------------
    //   manager send command to clients side
    //   管理员发送改变动画模式的指令
    // paras 
    // {
    //      type : 'ad'   'background'  'cubing'  'awarding'    
    //      model ： 模式1，2，3，3，4，，，6，6、、、、
    // }
    //   '广告轮播'  
    //   '三阶初赛'
    //   '三阶决赛'
    //   '二阶初赛'
    //   '二阶决赛'
    //   '金字塔初赛'
    //   '金字塔决赛'

    client.on('manage_set_model',config=>{
      console.log('manage_set_model',config)
      io.emit('set_model_to_stage',config)
    })
  
  

    // ---------------------------------------message---------------------------------------------------------------
    //   manager update result to clients side
    //   管理员提交选手成绩
    client.on('manage_update_result',data =>{
      console.log('manage_update_result',data)
      io.emit('update_result_to_stage',data)
    })

    // ---------------------------------------services---------------------------------------------------------------
 
  
    // 失去连接事件
    client.on('disconnect', (reason) => { 
      //
      if(client.id != m_socket_client.id && m_socket_client!=''){
        m_socket_client.emit('visitor_closed_to_manager',client.id)
      }else if(m_socket_client!=''){
        console.log('manager disconnect')
      }else{
           console.log('disconnect',reason)
      }
     });
  });