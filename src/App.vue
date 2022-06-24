<template>
  <div>
    <div class="app">
      <div class="nav">
        <!-- 顶部导航区 -->
      <ul>
        <li>
          <router-link to="/login">
            登录
          </router-link>
          <router-link to="/register">
            注册
          </router-link>
          <router-link to="/Home">
            商城
          </router-link>
          <router-link to="/order">
            我的订单
          </router-link>
          <router-link to="/shoppingcart">
            <i class="el-icon-shopping-cart-full"></i>购物车
          </router-link>    
        </li>
      </ul>
    </div>
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
    <!-- <GoodList></GoodList> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  computed: {
    ...mapGetters([
      "getNum"
    ]),
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
li{list-style:none;}
a{text-decoration: none;}

.nav{

  height: 50px;
  padding: 0;
}
/* .nav ul{
  
   float: right;
  clear: right; 
}  */
.nav .shopCart:hover a{
  background: yellow;
}
/* .nav li a {
  color: #c23952;
} */
.nav .shopCart {
  width: 120px;
  background: #d61e1e;
  overflow: hidden;
}
/* .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
} */
</style>
