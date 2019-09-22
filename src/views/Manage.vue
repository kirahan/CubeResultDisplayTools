<template>
        <div>
            <div class="left">
                <div>
                    <h3 >编号</h3>
                    <input class="no" v-model="player_id">
                    <h3 >名字：{{player_name}} 年龄：{{player_age}}</h3>
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
                        <input class="t1" @keyup.enter="movedown" placeholder="00:00:00" @focus='setref(1)' ref="1" v-model="result_t1">
                        <br>
                        <input class="t2" @keyup.enter="movedown" placeholder="00:00:00" @focus='setref(2)' ref="2" v-model="result_t2">
                        <br>
                        <input class="t3" @keyup.enter="movedown" placeholder="00:00:00" @focus='setref(3)' ref="3" v-model="result_t3">
                        <br>
                        <input v-if="round_selected=='final'" class="t4" @keyup.enter="movedown" @focus='setref(4)' ref="4" placeholder="00:00:00" v-model="result_t4">
                        <br>
                        <input v-if="round_selected=='final'" class="t5" @keyup.enter="movedown" @focus='setref(5)' ref="5" placeholder="00:00:00" v-model="result_t5">
                    </div>
                
                    

                </div>

                <button @click="SetModel('3x3_first')">三阶初赛</button>
                <button @click="SetModel('3x3_final')">三阶决赛</button>
                <button @click="SetModel('2x2')">仅二阶</button>
                <button @click="SetModel('pyramid')">仅金字塔</button>
                <button @click="UpdateResult">上传成绩</button>
                <button @click="DeleteCurrentResult">删除当前成绩</button>
            </div>

            <div class="right">
                <div class="right1">
                    <h1>三阶</h1>
                    <div class="right_name" v-for="(player,i) in playerlist" :key="i" >
                        <el-button type="primary" 
                                    v-if="player.item.indexOf('三阶')!=-1"
                                    @click.prevent="PlayerChooseItem('3x3',player)"
                                    >{{player.no}} | {{player.name}}
                        </el-button>
                    </div>
                </div>

                <div class="right1">
                    <h1>二阶</h1>
                    <div class="right_name" v-for="(player,i) in playerlist" :key="i" >
                            <el-button type="success"  v-if="player.item.indexOf('二阶')!=-1"
                                @click.prevent="PlayerChooseItem('2x2',player)"
                                >{{player.no}} | {{player.name}}
                            </el-button>
                    </div>
                </div>
                
                <div class="right1">
                    <h1>金字塔</h1>
                    <div class="right_name" v-for="(player,i) in playerlist" :key="i" >
                            <el-button type="warning"  v-if="player.item.indexOf('金字塔')!=-1"
                                @click.prevent="PlayerChooseItem('pyramid',player)"
                                >{{player.no}} | {{player.name}}
                            </el-button>
                    </div>
                </div>


                    
                    
           
        </div>
        </div>    
</template>

<script>
export default {
    name: 'manage',
    data(){
        return {
            playerlist: [],
            result_t1 : undefined,
            result_t2 : undefined,
            result_t3 : undefined,
            result_t4 : undefined,
            result_t5 : undefined,
            player_id : undefined,
            player_name : '',
            player_age: '',
            item_selected : '3x3',
            round_selected : 'first',
            m_socket_id: '',
            focusnumber : 1,
            players_buffer_3x3 : [],
            players_buffer_2x2 : [],
            players_buffer_pyramid :[],
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
        SetModel(model){
            const config = {
                type : 'result',
                model : model,
            }
            console.log('set model',config)
            this.$socket.emit('manage_set_model',config)
        },
        // 
        formattime(str){
            let min 
            let sec
            let ms
            // 1.23.45
            if(str.length==8){
                min = Number(str.slice(0,2))
                sec = Number(str.slice(3,5))
                ms = Number(str.slice(6))
            }else if(str == 'dnf' || str == 'DNF' || str == 'd' || str == 'D'){
                return 'DNF'
            }else if(str.length==7){
                min = Number(str.slice(0,1))
                sec = Number(str.slice(2,4))
                ms = Number(str.slice(5))
            }else if(str.length==5){
                min = 0
                sec = Number(str.slice(0,2))
                ms = Number(str.slice(3))
            }else if(str.length==4){
                min = 0
                sec = Number(str.slice(0,1))
                ms = Number(str.slice(2))
            }else if(str.length == 0){
                min = 0
                sec = 0
                ms = 0
            }
            // console.log([min*6000+sec*100+ms,`${min}:${sec}.${ms}`])
            return min*6000+sec*100+ms
        },

        // 更新数据
        async UpdateResult(){
            let best_of_3 
            let best_of_5
            let avg_of_5
            let rank
            let datasend
            let t1 = this.formattime(this.result_t1)
            let t2 = this.formattime(this.result_t2)
            let t3 = this.formattime(this.result_t3)
            

            if(this.round_selected=='first'){
                let timelist = [t1,t2,t3]
                let sortlist = [...timelist].sort((p1,p2)=>{
                    // return p1-p2
                    if(p2=='DNF'){
                        return -1
                        }
                    else{
                            return p1-p2
                        }
                  })
                console.log(sortlist)
                best_of_3 = sortlist[0]
                datasend = {
                        rank: '-',
                        id : this.player_id,
                        name : this.player_name,
                        age : this.player_age,
                        item : this.item_selected,
                        round : this.round_selected,
                        result : best_of_3,
                        t1: t1,
                        t2: t2,
                        t3: t3,
                }
            }else{
                let t4 = this.formattime(this.result_t4)
                let t5 = this.formattime(this.result_t5)

                let timelist = [t1,t2,t3,t4,t5]
                let sortlist = [...timelist].sort((p1,p2)=>{
                    if(p2=='DNF'){
                                return -1
                                }
                    else{
                            return p1-p2
                        }
                  })
                console.log(sortlist)
                best_of_5 = sortlist[0]
                if(sortlist[3]=='DNF' && sortlist[4] == 'DNF'){
                    avg_of_5 = 'DNF'
                }else{
                    avg_of_5 = Math.floor((sortlist[1]+sortlist[2]+sortlist[3])/3)
                }
                datasend = {
                        rank: '-',
                        id : this.player_id,
                        name : this.player_name,
                        age : this.player_age,
                        item : this.item_selected,
                        round : this.round_selected,
                        best : best_of_5,
                        result : avg_of_5,
                        t1: t1,
                        t2: t2,
                        t3: t3,
                        t4: t4,
                        t5: t5,
                }
            }
            console.log('update result',datasend)
            //
            const sed = await this.$http.post('/results/',datasend)
            // const res = await this.$http.get('/results/')
            // console.log(res)
            this.$socket.emit('manage_update_result','data already sended')
        },

        PlayerChooseItem(item,playerinfo){
            this.player_id = playerinfo.no
            this.player_name = playerinfo.name
            this.player_age = playerinfo.age
            this.item_selected = item
            if(item!='3x3'){
                this.round_selected = 'final'
            }else{
                this.round_selected = 'first'
            }   
        },

        // 支持回车往下换行，和手动设置焦点之后下次回车换行
        setref(refno){
            this.focusnumber = refno
        },
        movedown(){
                //移动光标
                if(this.round_selected == 'final'){
                    if(this.focusnumber<5){
                    this.focusnumber++
                    this.$refs[this.focusnumber].focus()
                    }
                }else{
                    if(this.focusnumber<3){
                        this.focusnumber++
                        this.$refs[this.focusnumber].focus()
                    }
                }
                
        },

        async DeleteCurrentResult(){
            const condition = {
                id : this.player_id,
                item : this.item_selected,
                round : this.round_selected
            }
            console.log(condition)
            const res = await this.$http.post('/results/delete',condition)
            this.$socket.emit('manage_update_result','data already sended')
        },

        async refreash(){
                const res = await  this.$http.get('/players/')
                this.playerlist = res.data
            },
    
    
    },
    created(){
        this.refreash()
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
    .left{
        position: absolute;
        top:0%;
        left: 0%;
        width: 50%;
    }
    .right{
        position: absolute;
        top:0%;
        right: 0%;
        width: 50%;
    }
    .right1{
        display: inline-block;
        position: relative;
        top: 0%;
        width: 33%;
    }
    .right_name{
        margin-top:20px;
        margin-right: 10px;
        display:inline-block;
    }
</style>