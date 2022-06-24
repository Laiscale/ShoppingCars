<template>

<div id="background">
  
    <div class="container">
        <form action="">
          <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
          <h1>欢迎登录</h1>
          <div class="form">
              <div class="item">
                <label>用户名：</label><input type="text" name="userName" v-model.trim="loginForm.name" placeholder="请输入用户名">
                <!-- v-model把输入的值传输给name变量 -->
                <br/>
              </div>
              <div class="item">
                <label>密码：</label><input type="password" name="password" v-model.trim="loginForm.password" placeholder="请输入密码">
                <br/>
              </div>
              <div class="keep">
                <input @click="handlesave" id="yes" type="radio" value="0" >
                <label for="yes">保持登录状态</label>
              </div>
          </div>
          
        </form>
              <button  type="submit" @click.prevent="handlelogin">登录</button>
              <!-- v-on点击按钮触发handlelogin方法 -->
              <button  @click.prevent="handleregister">注册</button>
          <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      loginForm: {
        name: '',
        password: '',
        st:"false"
      }
    }
  },
  methods:{
    async handlelogin()
    {
      const {data:res} = await this.$axios.post(`/user/login?name=`+this.loginForm.name+`&password=`+this.loginForm.password);
      console.log(res)
      this.$store.state.UserId = res
      this.$router.replace('/Home');
      // if(this.loginForm.name===localStorage['name'] && this.loginForm.password===localStorage['password'])
      //  {
      //    this.$router.replace('/Home');
      //  } 
      //  else if(this.name==='')
      //  {
      //    alert('用户名不为空');
      //  }
      //  else if(this.password==='')
      //  {
      //    alert('密码不为空');
      //  }
      // else{
      //   alert('账号不存在，请注册后登录');
      //   }
    },
    handleregister()
    {
      this.$router.replace('/register')//点击注册按钮，跳转至注册页面
    },
    handlesave:function(){
      this.st="true";//修改登录状态为true
      localStorage.setItem('s',this.st);
      console.log(localStorage.s);
    }
  }
}
</script>

<style scoped>
#background{
    width: 100%;
    height: 100%;
    background: url("../assets/login.png");
    /* background: rgb(113, 109, 207); */
    background-size:100% 100%;
    position: fixed;
    top: 0;
    left: 0;
}

.container{
  width: 520px;
  height: 420px;
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%,-50%);
  background:#00000090;
  text-align: center;
  border-radius: 20px;
  margin-top: 10px;
}
.container h1{
  color: rgb(190, 181, 62);
  margin-left: 20px;
}
.item {
  color: white;
  margin-left: 15%;
  margin-top: 35px;
  font-size: 30px;
  text-align: left;
}
.item label{
  float:left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}
input{
  margin-left: 1px;
  padding: 4px;
  border: solid 1px #4e5ef3;
  outline: 0;
  font: normal 16px/100% Verdana,Tahoma,sans-serif;
  width: 200px;
  height: 30px;
  background:#f1f1f190;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
}
button{
  position: relative;
  height: 40px;
  width: 100px;
  background: rgba(35, 19, 252, 0.425);
  border-radius: 10px;
  margin-top: 18px;
  box-shadow: none;
  color: white;
  margin-left: 40px;
  margin-right: 10px;

}
.keep{
  color: white;
}
.keep input{
  width: 20px;
  height: 20px;
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 10px;
}

</style>