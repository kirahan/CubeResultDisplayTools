<template>
  <div
    class="login"
    :class="{ login__signin: isSignIn, login__signup: isSignUp }"
  >
    <img class="logo" src="../../assets/android-logo.png" alt="">
    <p>CubeNode节点魔方</p>
    <LoginTabs @click.native="switchState" />
    
    <form class="login_form">
    <div class="login_form_r1">
      <div class="login_text">
            <span class="login_textfield">
                <label :style="{color:form.Username.color}" ><i  class="fa fa-user"></i> {{form.Username.txt}}</label>
                <input type="text" v-model="userInfo.username"/>
            </span>
        
      </div>
    </div>
    <div class="login_form_r2">
        <span class="login_textfield">
                <label :style="{color:form.Email.color}" ><i  class="fa fa-envelope-o"></i> {{form.Email.txt}}</label>
                <input type="text"  v-model="userInfo.mail" />
            </span>
    </div>
    <div class="login_form_r3">
        <span class="login_textfield">
                <label :style="{color:form.Pwd.color}" ><i  class="fa fa-lock"></i> {{form.Pwd.txt}}</label>
                <input current-password type="password" 
                @input="pwdchange()" @blur="pwdleave()"
                placeholder="6位以上数字、字母组合"  v-model="userInfo.password" />
                <span class="pwd_des" :style="{color : pwd_com_color}">
                  <i v-if="pwd_des.state>=1"
                  :style="{color : pwd_com_color}"
                   class="fa fa-minus"></i>
                  <i v-if="pwd_des.state>=2"
                  :style="{color : pwd_com_color}"
                  class="fa fa-minus"></i>
                  <i v-if="pwd_des.state>=3"
                  :style="{color : pwd_com_color}"
                  class="fa fa-minus"></i>
                  {{pwd_com_text}}
                  </span>
            </span>
    </div>
    <div class="login_form_r4">
        <span class="login_textfield">
                <label new-password :style="{color:form.RePwd.color}" ><i  class="fa fa-lock"></i> {{form.RePwd.txt}}</label>
                <input type="password" 
                  @blur="pwdcompare()"
                  v-model="userInfo.repassword"/>
            </span>
    </div>
    <div class="login_form_r4">
        <span class="login_textfield">
                <label :style="{color:form.Phone.color}" ><i  class="fa fa-mobile"></i> {{form.Phone.txt}}</label>
                <input type="number"  v-model="userInfo.phone" />
            </span>
    </div>
    <div class="login_form_r4">
        <span class="login_textfield">
                <label :style="{color:form.VeriCode.color}" ><i  class="fa fa-ticket"></i> {{form.VeriCode.txt}}</label>
                <input type="text"  v-model="userInfo.messagecode"/>
                <!-- 手机号码框不为空，同时字段disable为false才可以触发按键 -->
                <label class="messagebtn"
                 :style="{'color':VeriCodeTextColor}" 
                 @click="sendVeriCode()" >
                 获取验证码
                 <span class="clodtime">{{VeriCodeData.clodtime}}</span></label>     

            </span>

    </div>
    <div class="login_form_r5">
      <span class="login_checkbox">
            <input id="login-checkbox-1" type="checkbox" />
            <label for="login-checkbox-1">保持登陆</label>
      </span>
      <label>忘记密码</label>
    </div>
    <div>
        <span class="login_button">
            <input type="button" value="" />
            <label  >登陆</label>
            <label @click="submitUser()">注册</label>
        </span>
    </div>
  </form>



  </div>
</template>
<script>
import LoginTabs from './LoginTabs'

export default {
  props:["type"],
  components: {
    LoginTabs
  },
  data () {
    return {
      state: 1,
      checked : false,
      form : {
        Username : {
          txt :'用户名',
          color:'#007dff'
        },
        Email : {
          txt :'邮箱地址',
          color:'#007dff'
        },
        Pwd : {
          txt :'输入密码',
          color:'#007dff'
        },
        RePwd : {
          txt :'再次输入密码',
          color:'#007dff'
        },
        Phone : {
          txt :'输入手机号码',
          color:'#007dff'
        },
        VeriCode : {
          txt :'输入验证码',
          color:'#007dff'
        },
      },
      VeriCodeData : {
        clodtime : '',
        disabled : false,
        code : ''

      },
      userInfo : {
        username : '',
        mail : '',
        password : '',
        repassword : '',
        phone : '',
        messagecode : ''
      },
      pwd_des : {
        state : 0,
      }
    }
  },
  computed: {
    isSignIn () {
      return this.state === 1
    },
    isSignUp () {
      return this.state === 2
    },
    VeriCodeTextColor(){
      if(this.userInfo.phone && !this.VeriCodeData.disabled){
        return 'blue'
      }else{
        return 'grey'
      }
    },
    pwd_com_color(){
      if(this.pwd_des.state==1){
        return 'rgb(182,3,3)'
      }else if(this.pwd_des.state==2){
        return 'rgb(80,80,80)'
      }else if(this.pwd_des.state==3){
        return 'rgb(3, 182, 3)'
      }else{
        return 'white'
      }
    },
    pwd_com_text(){
      if(this.pwd_des.state==1){
        return '弱'
      }else if(this.pwd_des.state==2){
        return '中'
      }else if(this.pwd_des.state==3){
        return '强'
      }else{
        return ''
      }
    }
    
  },
  methods: {
    switchState () {
      this.state = this.state === 1 ? 2 : 1
    },
    cldetimeloop(){
        const that = this
        this.VeriCodeData.clodtime = 30
        this.VeriCodeData.disabled = true
        const startpoint = new Date().getTime()
        const loopid = setInterval(function(){
          if(that.VeriCodeData.clodtime > 0){
              that.VeriCodeData.clodtime = 30 - Math.floor((new Date().getTime() - startpoint)/1000)
          }else{
            clearInterval(loopid)
            that.VeriCodeData.disabled = false
            that.VeriCodeData.clodtime = ''
          }
        },127)
        
    },
    async sendVeriCode(){
      if(this.checkphone()){
        if(!this.VeriCodeData.disabled){
          const res = await  this.$http.post('/vericode/',{phone:this.userInfo.phone})
          console.log(res.data)
          this.VeriCodeData.code = res.data.code
          this.cldetimeloop()
          if(res.data.code){
            this.VeriCodeData.disabled = true
            this.VeriCodeData.clodtime = 30
          }else{
            console.log(res.data.err)
          }
        }
      }
      
    },
    pwdchange(){
      if(this.userInfo.password.length<6){
          this.pwd_des.state = 0
      }else if(this.userInfo.password.length<8){
          this.pwd_des.state = 1
      }else if(this.userInfo.password.length<10){
          this.pwd_des.state = 2
      }else if(this.userInfo.password.length<20){
          this.pwd_des.state = 3
      }
    },
    pwdleave(){
      let valPwd = this.userInfo.password
      if(valPwd == null || valPwd.length < 6 || valPwd.length > 24 || valPwd.trim().length == ""){
            this.form.Pwd.txt = '密码无效'
            this.form.Pwd.color = 'red'
            return false
      }

      if(this.userInfo.repassword){
        return this.pwdsame()
      }
      let arrVerify = [
          {regName: 'Number', regValue: /^.*[0-9]+.*/},
          {regName: 'LowerCase', regValue: /^.*[a-z]+.*/},
          {regName: 'UpperCase', regValue: /^.*[A-Z]+.*/},
          // {regName: 'SpecialCharacters', regValue: /^.*[^a-zA-Z0-9]+.*/}
        ]
      let regNum = 0;// 记录匹配的次数
      for (let iReg = 0; iReg < arrVerify.length; iReg++) {
        if (arrVerify[iReg].regValue.test(valPwd)) {
          regNum = regNum + 1
        }
      }
      if (regNum < 2) {
            this.form.Pwd.txt = '必须包含字母和数字'
            this.form.Pwd.color = 'red'
            return false
      }else{
          this.form.Pwd.txt = '输入密码'
          this.form.Pwd.color = '#007dff'
          return true
      }
    },
    pwdsame(){
      if(this.userInfo.password == this.userInfo.repassword){
        this.form.Pwd.txt = '输入密码'
        this.form.Pwd.color = '#007dff'
        this.form.RePwd.txt = '再次输入密码'
        this.form.RePwd.color = '#007dff'
        return true
      }else{
        this.form.Pwd.txt = '密码不一致'
        this.form.Pwd.color = 'red'
        this.form.RePwd.txt = '密码不一致'
        this.form.RePwd.color = 'red'
        return false
      }
    },
    pwdcompare(){
      return this.pwdleave() && this.pwdsame()
    },



    checkformnotempty(){
       // 用户名
      if(!this.userInfo.username){
        this.form.Username.txt = '用户名为空'
        this.form.Username.color = 'red'
      }else{
        this.form.Username.txt = '用户名'
        this.form.Username.color = '#007dff'
      }
      // 邮箱地址
      if(!this.userInfo.mail){
        this.form.Email.txt = '邮箱地址为空'
        this.form.Email.color = 'red'
      }else{
        this.form.Email.txt = '邮箱地址'
        this.form.Email.color = '#007dff'
      }
      // 输入密码
      if(!this.userInfo.password){
        this.form.Pwd.txt = '密码无效'
        this.form.Pwd.color = 'red'
      }else{
        this.form.Pwd.txt = '输入密码'
        this.form.Pwd.color = '#007dff'
      }
      // 再次输入密码
      if(!this.userInfo.repassword){
        this.form.RePwd.txt = '密码不一致'
        this.form.RePwd.color = 'red'
      }else{
        this.form.RePwd.txt = '再次输入密码'
        this.form.RePwd.color = '#007dff'
      }
      // 输入手机号码
      if(!this.userInfo.phone){
        this.form.Phone.txt = '手机号为空'
        this.form.Phone.color = 'red'
      }else{
        this.form.Phone.txt = '输入手机号码'
        this.form.Phone.color = '#007dff'
      }
      // 输入验证码
      if(!this.userInfo.messagecode){
        this.form.VeriCode.txt = '验证码为空'
        this.form.VeriCode.color = 'red'
      }else{
        this.form.VeriCode.txt = '输入验证码'
        this.form.VeriCode.color = '#007dff'
      }
    },
    checkemail(){
      const isemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(!isemail.test(this.userInfo.mail)){
        this.form.Email.txt = '邮箱地址无效'
        this.form.Email.color = 'red'
        return false
        }else{
          this.form.Email.txt = '邮箱地址'
          this.form.Email.color = '#007dff'
          return true
        }
    },
    checkphone(){
      const isphone=/^[1][3,4,5,7,8][0-9]{9}$/
      if(!isphone.test(this.userInfo.phone)){
          this.form.Phone.txt = '无效的手机号'
          this.form.Phone.color = 'red'
          return false
      }else{
          this.form.Phone.txt = '输入手机号码'
          this.form.Phone.color = '#007dff'
          return true
      }
    },
    
    async submitUser(){
      this.checkformnotempty()
      const isMail =  this.checkemail()
      const isPwdMail =  this.pwdcompare()
      const isPhoneMail =  this.checkphone()
      console.log(isMail,isPwdMail,isPhoneMail)
      if(isMail && isPwdMail && isPhoneMail && this.VeriCodeData.code == this.userInfo.messagecode){
          //
          console.log('inini')
          const userdata = {
            username : this.userInfo.username,
            password : this.userInfo.password,
            accesslevel : 'normal',
            userinfo : {
              email : this.userInfo.mail,
              phone : this.userInfo.phone
            }
          }

          const res = this.$http.post('/normalusers/',userdata)
          console.log(res,userdata)
      
    }
      

    },
  },
  created(){
      if(this.type == 'submit'){
          this.state = 2
      }else{
          this.state = 1
      }
  }
}
</script>
<style scoped>

@import url('https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css');

* {
  margin: 0;
}


.logo{
    max-width: 80px;
    max-height: 80px;
    padding-top:5vh; 
}
.login {
  width: 100%;
  height : 100vh;
  color: white;
  font-size: 14px;
  background-color: #007dff;
}


.login_form {
  /* display: flex; */
  padding: 20px;
}
.login_form > div {
  padding-bottom: 10px;
  display: flex;
  min-height: 40px;
  justify-content: space-between;
  transition: all 0.6s ease;
}
.login_text {
  display: flex;
  flex: 1;
}
.login_text .login_textfield {
  border-radius: 0;
}
.login_text .login_textfield:first-child {
  border-radius: 2px 0 0 2px;
}
.login_text .login_textfield:last-child {
  border-radius: 0 2px 2px 0;
}
.login__signup .login_form_r5 {
  opacity: 0;
  transition-duration: 0.4s;
} 
.login__signup .login_button label:nth-child(2) {
  transform: translateY(-100%);
  opacity: 0;
}
.login__signin .login_form_r1,
.login__signin .login_form_r4 {
  opacity: 0;
  transform: translateY(30%) scale(0.8);
}
.login__signin .login_form_r2,
.login__signin .login_form_r3 {
  transform: translateY(-100%);
}
.login__signin .login_form_r5 {
  transform: translateY(-400%);
}
.login__signin .login_button label:nth-child(3) {
  transform: translateY(100%);
  opacity: 0;
} 


.login_textfield {
  flex: 1;
  display: flex;
  padding: 10px;
  width: 100%;
  border-radius: 2px;
  background-color: white;
  box-shadow: 0 1px 1px #0066d0;
}
.login_textfield label {
  margin-right: 10px;
  color: #007dff;
}
.login_textfield label i {
  width: 20px;
}
.login_textfield label span {
  color : red;
}

.login_textfield .pwd_des  {
  color: black;
}

.login_textfield .pwd_des i {
  padding-left: 2px;
  color: rgb(3, 182, 3);
}

.login_textfield input {
  flex: 1;
  width: 0;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}
.login_textfield .messagebtn{
  color: #444;
}







.login_checkbox input {
  display: none;
}
.login_checkbox label:before,
.login_checkbox label:after {
  content: '';
  display: inline-block;
  margin-right: 5px;
  margin-top: 3px;
  width: 14px;
  height: 14px;
  vertical-align: top;
}
.login_checkbox label:before {
  border-radius: 2px;
  background-color: white;
  box-shadow: 0 1px 1px #0066d0;
}
.login_checkbox label:after {
  content: '\f00c';
  position: relative;
  display: none;
  z-index: 10;
  margin-right: -14px;
  width: 12px;
  height: 12px;
  padding: 1px;
  font: normal normal normal 12px/1 FontAwesome;
  color: #007dff;
  float: left;
}
.login_checkbox input:checked + label:after {
  display: inline-block;
}


.login_button {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
}
.login_button input {
  display: block;
  flex: 1;
  width: 0;
  height: 40px;
  border: none;
  border-radius: 2px;
  outline: none;
  background: #0066d0;
}
.login_button label {
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: all 0.6s ease;
}
</style>
