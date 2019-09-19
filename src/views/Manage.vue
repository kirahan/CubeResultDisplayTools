<template>
        <div>
            <div>
                <span >姓名</span>
                <input class="no" v-model="player_name">

                <div>
                    <span>项目：</span>
                    <el-radio-group v-model="item_selected">
                        <el-radio :label="'2x2'">二阶</el-radio>
                        <el-radio :label="'3x3'">三阶</el-radio>
                        <el-radio :label="'pyramid'">金字塔</el-radio>
                    </el-radio-group>
                    <span style="margin-left:100px">轮次：</span>
                    <el-radio-group v-model="round_selected">
                        <el-radio :label="'first'">初赛</el-radio>
                        <el-radio :label="'final'">决赛</el-radio>
                    </el-radio-group>

                </div>

                <div>
                    <input class="t1" placeholder="00:00:00" v-model="result_t1">
                    <br>
                    <input class="t2" placeholder="00:00:00" v-model="result_t2">
                    <br>
                    <input class="t3" placeholder="00:00:00" v-model="result_t3">
                    <br>
                    <input class="t4" placeholder="00:00:00" v-model="result_t4">
                    <br>
                    <input class="t5" placeholder="00:00:00" v-model="result_t5">
                </div>
               
                

            </div>

            <button @click="SetModel">设置模式</button>
            <button @click="UpdateResult">上传成绩</button>
        </div>    
</template>

<script>
export default {
    name: 'manage',
    data(){
        return {
            result_t1 : undefined,
            result_t2 : undefined,
            result_t3 : undefined,
            result_t4 : undefined,
            result_t5 : undefined,
            player_name : '',
            item_selected : '3x3',
            round_selected : 'first',
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
                name : this.player_name,
                item : this.item_selected,
                round : this.round_selected,
                t1: this.result_t1,
                t2: this.result_t2,
                t3: this.result_t3,
                t4: this.result_t4,
                t5: this.result_t5,
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
    .no{
        width: 200px;
        height: 50px;
        background-color: rgb(251, 248, 245);
        font-size: 40px;
        margin: 10px;
        text-align: center;
    }
    .t1,.t2,.t3,.t4,.t5{
        width: 500px;
        height: 100px;
        background-color: rgb(251, 248, 245);
        font-size: 80px;
        margin: 10px;
        text-align: center;
        
    }
</style>