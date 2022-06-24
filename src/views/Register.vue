<template>
    <div id="background">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <div id="contain">
        <h1>注册</h1>

        <div class="form">
          <label>用户名：</label><input type="text" v-model.trim="loginForm.name"><br/>
        </div>
        <div class="form">
          <label>密码：</label><input type="password" v-model.trim="loginForm.password"><br/>
        </div>
        <button @click.prevent="handlefinish">提交</button>
      </div>
    </div>
</template>

<script>
export default {
    // name:'register',
    props: {
    msg: String
  },
  data(){
    return{
      loginForm: {
        name: '',
        password: ''
      }
  }
  },
  methods:{
  //点击完成按钮触发handlefinish
    async handlefinish()
    {
      
        const {data:res} = await this.$axios.post(`/user/register?name=`+this.loginForm.name+`&password=`+this.loginForm.password)
        console.log(res)
        alert("注册成功");
        this.$router.replace('/Login');//完成注册后跳转至登录页面
      // }
    }
  }
  
};
</script>

<style scoped>
#background{
  width: 100%;
    height: 100%;
    background: url("../assets/register.png");
    /* background: white; */
    background-size:100% 100%;
    position: fixed;
    top: 0;
    left: 0;
}
#contain{
  width: 520px;
  height: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background:#00000090;
  text-align: center;
  border-radius: 20px;
}
#contain h1{
  color: rgb(190, 181, 62);
}
.form{
  color: white;
  margin-left: 20%;
  margin-top: 60px;
  font-size: 20px;
  text-align: left;
}
label{
  float:left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}
input,textarea{
  margin-left: 10px;
  padding: 4px;
  border: solid 1px #4e5ef3;
  outline: 0;
  font: normal 13px/100% Verdana,Tahoma,sans-serif;
  width: 200px;
  height: 20px;
  background:#f1f1f190;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
}
input:hover,textarea:hover,input:focus,textarea:focus{border-color:#0d0aa1;}
button{
  position: relative;
  height: 33px;
  width: 150px;
  background: rgba(35, 19, 252, 0.425);
  border-radius: 10px;
  margin-top: 38px;
  box-shadow: none;
  color: white;
  margin-left: 40px;
}
</style>