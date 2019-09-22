<template>
  <div class="home">
      <h2 class="title">2019武汉少儿魔方赛·成绩板</h2>
      
      <div v-if="now_display=='3x3_first'">
        <div class="result_333">
            <Playersresult3  :playerdata='data_3x3_first_u8' :title="'三阶初赛·8岁以下'"></Playersresult3>
        </div>
        <div class="result_333">
            <Playersresult3  :playerdata='data_3x3_first_8plus' :title="'三阶初赛·8岁以上(含)'"></Playersresult3>
        </div>
      </div>

      <div v-if="now_display=='3x3_final'">
        <div class="result_333">
            <Playersresult5  :playerdata='data_3x3_final_u8' :title="'三阶决赛·8岁以下'"></Playersresult5>
        </div>
        <div class="result_333">
            <Playersresult5  :playerdata='data_3x3_final_8plus' :title="'三阶决赛·8岁以上(含)'"></Playersresult5>
        </div>
      </div>

      <div v-if="now_display=='2x2'">
            <Playersresult5  :playerdata='data_2x2_final' :title="'二阶预决赛'"></Playersresult5>
      </div>

      <div v-if="now_display=='pyramid'">
            <Playersresult5  :playerdata='data_pyramid_final' :title="'金字塔预决赛'"></Playersresult5>
      </div>

      
  </div>
</template>

<script>
// @ is an alias to /src

import Playersresult3 from '../components/Name3'
import Playersresult5 from '../components/Name5'

export default {
  name: 'home',
  components: { Playersresult3,Playersresult5},
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
          if(display_type == 'result'){
            this.now_display = config.model
          }

          //更新数据
          // this.$set(this.room_visitor_data,visitor_socket_id,room_v_data)
          console.log('[set display ways]',config)
          
        },

        //更新比赛数据
        update_result_to_stage: function(data){
          if(data.item == '3x3' && data.round == 'first'){
                  // console.log(data)
                  if(data.age == 'U8'){
                      this.data_3x3_first_u8.push(data)
                      //排序
                      this.data_3x3_first_u8.sort((p1,p2)=>{
                         if(p2=='DNF'){
                            return -1
                            }
                        else{
                                return p1-p2
                            }
                      })
                      for(let i=0;i<this.data_3x3_first_u8.length;i++){
                        this.$set(this.data_3x3_first_u8[i],'rank',i+1)
                      }
                  }else if(data.age == '8PLUS'){
                      this.data_3x3_first_8plus.push(data)
                      //排序
                      this.data_3x3_first_8plus.sort((p1,p2)=>{
                          return p1.result-p2.result
                      })
                      for(let i=0;i<this.data_3x3_first_8plus.length;i++){
                        this.$set(this.data_3x3_first_8plus[i],'rank',i+1)
                      }
                  }
                  console.log('[update players data]',this.data_3x3_first_u8,this.data_3x3_first_8plus)
          }else if(data.item == '3x3' && data.round == 'final'){
                   if(data.age == 'U8'){
                      this.data_3x3_final_u8.push(data)
                      //排序
                      this.data_3x3_final_u8.sort((p1,p2)=>{
                         if(p2=='DNF'){
                            return -1
                            }
                        else{
                                return p1-p2
                            }
                      })
                      for(let i=0;i<this.data_3x3_final_u8.length;i++){
                        this.$set(this.data_3x3_final_u8[i],'rank',i+1)
                      }
                  }else if(data.age == '8PLUS'){
                      console.log('11')
                      this.data_3x3_final_8plus.push(data)
                      //排序
                      this.data_3x3_final_8plus.sort((p1,p2)=>{
                          return p1.result-p2.result
                      })
                      for(let i=0;i<this.data_3x3_final_8plus.length;i++){
                        this.$set(this.data_3x3_final_8plus[i],'rank',i+1)
                      }
                  }
                  console.log('[update players data]',this.data_3x3_final_u8,this.data_3x3_final_8plus)
          }else if(data.item == '2x2'){
                  this.data_2x2_final.push(data)
                  this.data_2x2_final.sort((p1,p2)=>{
                      return p1.result-p2.result
                  })
                  for(let i=0;i<this.data_2x2_final.length;i++){
                        this.$set(this.data_2x2_final[i],'rank',i+1)
                      }
                  console.log('[update players data]',this.data_2x2_final)
          }else if(data.item == 'pyramid'){ 
                  this.data_pyramid_final.push(data)
                  this.data_pyramid_final.sort((p1,p2)=>{
                      return p1.result-p2.result
                  })
                  for(let i=0;i<this.data_pyramid_final.length;i++){
                        this.$set(this.data_pyramid_final[i],'rank',i+1)
                      }
                  console.log('[update players data]',this.data_pyramid_final)
          }
        },
    },
  data(){
    return {
        now_display: '3x3_first',
        test_data : '',
        data_3x3_first_u8 :[],
        data_3x3_first_8plus : [],
        data_3x3_final_u8 : [],
        data_3x3_final_8plus : [],
        data_2x2_final : [],
        data_pyramid_final : [],
        s_socket_id: '',
        // nowShowingData : []
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
  .result_333{
    display: inline-block;
    width: 48%;
    margin: 10px;
  }
  .myinput{
    width: 300px;
    height: 50px;
    margin-top:50px;
  }

</style>