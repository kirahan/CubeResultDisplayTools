<template>
    <div>
        <div
            class="left"
        >
                <h3 >用户名</h3>
                <input class="no"ref="1" autofocus v-model="adminuser_name">
                <h3 >密码</h3>
                <input class="name"  ref="2" v-model="adminuser_password" >
                <h3 >权限级别</h3>
                <input class="access"   ref="2" v-model="adminuser_access" >
                <el-button type="primary" style="margin-bottom:50px;margin-top:50px;width:100px;height:50px;font-size:30px"
                    @click.prevent="addadminuser()"
                >添加</el-button>
        </div>
        
    </div>    
</template>

<script>
export default {
        data(){
            return {
                adminuser_name : undefined,
                adminuser_password : undefined,
                adminuser_access : undefined,
            }
        },
        methods:{
            async addadminuser(){
                const addadminuser_data = {
                    username : this.adminuser_name,
                    password : this.adminuser_password,
                    accesslevel : this.adminuser_access,
                }
                console.log(addadminuser_data)
                const res = await  this.$http.post('/adminusers/',addadminuser_data)
                this.$message({
                                message: '添加成功',
                                type: 'success'
                                });
                this.adminuser_name = null
                this.adminuser_password = null
                this.refreash()
            },
            async refreash(){
                const res = await  this.$http.get('/adminusers/')
                console.log(res.data)
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