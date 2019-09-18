<template>
        <div>
            <h2>这里是管理页面</h2>
            <p>我们要在这里写成绩输入页面，用于录入成绩</p>
            <button @click="SetModel">设置模式</button>
            <button @click="UpdateResult">上传成绩</button>
        </div>    
</template>

<script>
export default {
    name: 'manage',
    data(){
        return {
            m_socket_id: '',
            playerData : {
                no : Number,
                name : String,
                item : String,
                round: Number,
                t1:Number,
                t2:Number,
                t3:Number,
                t4:Number,
                t5:Number,
            }
        }
    },
    sockets: {
        connect: function () {
            console.log('stage socket connected')
            },

        disconnect: function(){
            console.log('stage socket disconnected')
        },

        //获取socket的id
        handshake_server_to_manager : function(stage_socket_id){
          this.s_socket_id = stage_socket_id
        },

        //心跳
        heartbeat_server_to_manager : function(data){
        //   console.log('pang',data)
        },
    },
    methods : {
        //第一次握手
        handshake(){
            this.$socket.emit('handshake-manager')
        },
        //心跳
        heartbeat(){
            let heartloop = setInterval(() => {
            this.$socket.emit('heartbeat-manager')
            }, 500);
        },
        // 设置显示模式
        SetModel(){
            const config = {
                type : 'ad',
                model : 1,
            }
            console.log('set model',config)
            this.$socket.emit('manage_set_model',config)
        },
        // 更新数据
        UpdateResult(){
            const data = {
                name : 'hanzhao',
                t1:12.50,
            }
            console.log('update result',data)
            this.$socket.emit('manage_update_result',data)
        }
    },
    created(){
        this.handshake()
        this.heartbeat()
    },
}
</script>

<style scoped>

</style>