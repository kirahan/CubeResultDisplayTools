<template>
    <div>
        <div
            class="left"
        >
                <h3 >编号</h3>
                <input class="no" @keyup.enter="movedown" ref="1" autofocus v-model="player_id">
                <h3 >姓名</h3>
                <input class="name" @keyup.enter="movedown" ref="2" v-model="player_name" >
                <h3>年龄</h3>
                <div>
                    <el-radio v-model="player_age" label="U8" border>U8</el-radio>
                    <el-radio v-model="player_age" label="8PLUS" border>8PLUS</el-radio>
                </div>
                <h2>参赛项目</h2>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="三阶" border size="medium"></el-checkbox>
                    <el-checkbox label="二阶" border size="medium"></el-checkbox>
                    <el-checkbox label="金字塔" border size="medium"></el-checkbox>
                </el-checkbox-group>    
                <el-button type="primary" style="margin-bottom:50px;margin-top:50px;width:100px;height:50px;font-size:30px"
                    @click.prevent="addplayer()"
                >添加</el-button>
        </div>
        

        <div class="right">
            <el-button-group v-for="(player,i) in playerlist" :key="i" style="margin-top:20px">
                <el-button type="primary" 
                    @click.prevent="showsingleplayer(player.no)"
                >{{player.no}}|{{player.name}}|{{player.age}}|{{player.item}}</el-button>
                <el-button type="danger" style="margin-right: 10px"  icon="el-icon-delete"
                    @click.prevent="removeplayer(player.no)"
                ></el-button>
            </el-button-group>
        </div>
    </div>    
</template>

<script>
export default {
        //     directives: {
        //         focus: {
        //             // 指令的定义
        //             inserted: function (el) {
        //             el.focus()
        //             }
        //         }
        // },
        data(){
            return {
                player_id : undefined,
                player_name : undefined,
                player_age : undefined,
                checkList : [],
                playerlist :[],
                focusnumber : true,
            }
        },
        methods:{
            movedown(){

                //移动光标
                if(this.focusnumber<2){
                    this.focusnumber++
                    this.$refs[this.focusnumber].focus()
                }
            },
            async addplayer(){
                const player_data = {
                    no : this.player_id,
                    name : this.player_name,
                    item : this.checkList,
                    age : this.player_age,
                }
                console.log(player_data)
                const res = await  this.$http.post('/players/',player_data)
                this.$message({
                                message: '添加成功',
                                type: 'success'
                                });
                this.player_id++
                this.player_name = undefined
                this.checkList = []
                this.refreash()
            },
            async refreash(){
                const res = await  this.$http.get('/players/')
                this.playerlist = res.data
            },
            async showsingleplayer(no){
                const res = await  this.$http.get(`/players/${no}`)
                console.log(res.data)
                this.player_id = res.data.no
                this.player_name = res.data.name
                this.checkList = res.data.item
                this.player_age = res.data.age
            },
            async removeplayer(no){
                const res = await  this.$http.delete(`/players/${no}`)
                this.refreash()
            },
        },
        created(){
            this.refreash()
        }
}
</script>

<style scoped>

    .no{
        width: 300px;
        height: 100px;
        background-color: rgb(251, 248, 245);
        font-size: 60px;
        margin: 10px;
        text-align: center;
        
    }
    .name{
        width: 300px;
        height: 100px;
        background-color: rgb(251, 248, 245);
        font-size: 40px;
        margin: 10px;
        text-align: center;
        
    }
    .left{
        position: absolute;
        left: 0%;
        width: 30%;
    }
    .right{
        position: absolute;
        right: 0%;
        width: 70%;
    }
</style>