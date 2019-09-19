<template>
  <div class="home">
      <h2>这是展示页面</h2>
      <p>我们要在这里写界面呈现效果</p>
    
      <Playersresult3  v-for="(data,i) in nowShowingData" :key="i" :playerdata='data'></Playersresult3>
      
  </div>
</template>

<script>
// @ is an alias to /src

import Playersresult3 from '../components/Name3'


export default {
  name: 'home',
  components: { Playersresult3},
  sockets: {
        connect: function () {
            console.log('stage socket connected')
            },

        disconnect: function(){
            console.log('stage socket disconnected')
        },

        //获取socket的id
        handshake_server_to_stage : function(stage_socket_id){
          this.s_socket_id = stage_socket_id
        },

        //心跳
        heartbeat_server_to_stage : function(data){
          // console.log('pang',data)
        },

        // 设置显示模式
        set_model_to_stage : function(config){
          const display_type = config.type
          const display_model = config.model

          //更新数据
          // this.$set(this.room_visitor_data,visitor_socket_id,room_v_data)
          console.log('[set display ways]',config)
          
        },

        //更新比赛数据
        update_result_to_stage: function(data){
          this.nowShowingData.push(data)
          console.log('[update players data]',data)
        },
    },
  data(){
    return {
        test_data : '',
        resultdata : [
          {
            rank : 1,
            name : 'hanzhao',
            result : 21.35,
            t1:15.36,
            t2:25.78,
            t3:26.35
          },
          {
            rank : 2,
            name : 'nzhao',
            result : 25.35,
            t1:25.36,
            t2:25.78,
            t3:36.35
          }
          ,
          {
            rank : 3,
            name : 'zhao',
            result : 32.35,
            t1:15.36,
            t2:25.78,
            t3:26.35
          }
          ,
          {
            rank : 4,
            name : 'jo',
            result : 44.35,
            t1:15.36,
            t2:25.78,
            t3:26.35
          }
          ,
          {
            rank : 5,
            name : 'kira',
            result : 52.35,
            t1:15.36,
            t2:25.78,
            t3:26.35
          },
          {
            rank : 6,
            name : 'ycy',
            result : 56.25,
            t1: 56.36,
            t2: 45.87,
            t3: 23.56,
          }
        ],
        s_socket_id: '',
        nowShowingData : []
    }
  },
  methods : {
    //第一次握手
      handshake(){
          this.$socket.emit('handshake-stage')
      },
      //心跳
      heartbeat(){
          let heartloop = setInterval(() => {
          this.$socket.emit('heartbeat-stage')
          }, 500);
      },
  },
  created(){
    this.handshake()
    this.heartbeat()
  },
}
</script>


<style scoped>
  .myinput{
    width: 300px;
    height: 50px;
    margin-top:50px;
  }

</style>