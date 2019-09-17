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

//挂载db
// require('./plugins/db')(app)

//挂载app
// require('./routes/web_manager')(app)
// require('./routes/translate')(app)
// require('./routes/chat')(app)

//app 设置为3000端口
app.listen(3000,() =>{
    console.log('4000 and 3000 is listening')
})

let m_socket_client = ''

io.on('connection', client => {
    console.log('there is one socket client connected') 

    // ---------------------------------------init---------------------------------------------------------------
    //visitor_handshake
    client.on('handshake-visitor',()=>{
      client.emit('handshake_server_to_visitor',client.id)
    })

    //visitor_heart
    // 同时不断吧visitor的状态发送给服务器
    client.on('heartbeat-visitor',(data)=>{
      if(m_socket_client!= ''){
        // console.log('manage h in')
        client.emit('heartbeat_server_to_visitor')
        m_socket_client.emit('visitor_state_server_to_manager',data)
      }else{
        // console.log('manage h out')
        null
      }
    })

    //visitor_auth
    client.on('auth_request_from_visitor',(data)=>{
      console.log(data)
      // console.log(m_socket_client)
      io.emit('auth_request_to_manager',data)
    })


    //manager_handshake
    //同时保存manager的client，方便直接给manager发送信息
    client.on('handshake-manager',()=>{
      console.log(client.id)
      m_socket_client = client
      client.emit('handshake_server_to_manager',client.id)
    })

    //manager_heart
    client.on('heartbeat-manager',(data)=>{
      // console.log(data)
      client.emit('heartbeat_server_to_manager')
    })
  
    // --------------------------command--------------------------------------------------------------------------------------
    //   then manager  send  new emit to all clients side
    //   管理员发送  允许登陆的指令， ID表示client 的唯一id uuid
    client.on('v_auth_allowed',id =>{
      console.log('v_auth_allowed',id)
      io.emit('auth_allowed_to_v',id)
    })
  
  
    //   then manager  send new emit to all clients side
    //   管理员发送  不允许登录的指令， ID表示client 的唯一id uuid
    client.on('v_auth_refused',id =>{
      console.log('v_auth_refused',id)
      io.emit('auth_refused_to_v',id)
    })


    //   then manager  send new emit to all clients side
    //   管理员发送  不关闭的指令， ID表示client 的唯一id uuid
    client.on('v_conv_closed',id =>{
      console.log('v_conv_closed',id)
      io.emit('conv_closed_to_v',id)
    })
  
    //    send from manager side
    //   管理员发送  重启server命令
    client.on('reload',() =>{
        console.log('reload')
        // io.emit('reload')
    })
  


    // ---------------------------------------message---------------------------------------------------------------
    //   客户端发送的对话消息，message_v_to_m
    client.on('message_v_to_m',(data) =>{
      // console.log('message_v_to_m',data)
      if(m_socket_client!= ''){
        m_socket_client.emit('servermessage_v_to_m',data)
        // console.log(data)
      }else{
        io.emit('servermessage_v_to_m',data)
      }
    })



    //   管理员发送  重启server命令   message_m_to_v
    client.on('message_m_to_v',(data) =>{
      console.log('message_m_to_v',data)
      io.emit('message_m_to_v',data)
    })


    // ---------------------------------------services---------------------------------------------------------------
    //   顾客发送的服务指令，修理服务，visitor-fix-service
    client.on('visitor_fix_service',(data) =>{
      if(m_socket_client!= ''){
        m_socket_client.emit('needservices_fix_to_manager',data)
        console.log(data)
      }else{
        io.emit('needservices_fix_to_manager',data)
        console.log(data)
      }
    })

    //   顾客发送的服务指令，修理服务，visitor-fix-service
    client.on('visitor_order_service',(data) =>{
      if(m_socket_client!= ''){
        m_socket_client.emit('needservices_order_to_manager',data)
        console.log(data)
      }else{
        io.emit('needservices_order_to_manager',data)
        console.log(data)
      }
    })


  
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