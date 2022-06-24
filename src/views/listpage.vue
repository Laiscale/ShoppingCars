<template>
  <div class="container">
      <h3>商品列表</h3>
      <!-- 商品界面 -->
      <div class="goods">
        <li v-for="(item,index) in list" :key="item.id">
        <div class="good">
          <img :src="`http://202.193.53.235:8080/` + item.pthumbnail"/>
          <p class="desc">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price1 }}</p>
          <li>
              <button class="addnum" :disabled="item.piece <= 1" @click="desNumber(index)">-</button>
              <input type="text" v-model="item.piece" class="prinput">
              <button class="addnum" @click="addNumber(index)">+</button>
              <button class="buy" :value="1" @click="AddtoCart(item,index)">加入购物车</button>
          </li>
        </div>
        </li>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>

import { mapActions } from "vuex";
export default {
  data() {
    return {
      list: [], //存放商品的数组
      count: 0, //定义后端数据的数量
    }
  }, 
  methods: {
    ...mapActions(["updateShoppingCart"]),
    
    async AddtoCart(item,index){
      if (!this.$store.state.UserId) {
        this.$store.dispatch("Login", true);
         return;
      }
      this.count = this.count + this.list[index].piece //piece增加时count来监测
       const { data : ref} = await this.$axios
        .post('/cart/add?userId='+this.$store.state.UserId+'&goodsId='+item.id+'&num='+ this.list[index].piece +'&price='+ item.price1);
        console.log(ref)
      this.$store.state.carlist = []
      var t = await this.$axios
        .post(`/cart/listByUser?userId=`+ this.$store.state.UserId);
       t.data.forEach(arr =>{
        arr.check = true
      this.$store.state.carlist.push(arr)
      })
      console.log(this.$store.state.carlist)
      // this.$store.state.carlist = t.data
      
     
    },
    //数量增加
    addNumber(index) {
      this.list[index].piece++
    },
    //数量减少
    desNumber(index) {
      this.list[index].piece--
    },
  },
  //申请商品列表后端数据后，将数量piece添加进入数据，方便添加商品进入购物车时的后端接口调用
  async mounted(){
    const { data : res} = await this.$axios.get('/goods/list')
    res.forEach(element =>{
      element.piece = 1
      this.list.push(element)
    })
    console.log(this.list)
  },
}
</script>
<style scoped>
li{list-style:none;}
a{text-decoration: none;}
* {
  margin: 0;
  padding: 0;
}

body {
  height: 1500px;
  
}

.container {
  width: 1500px;
  margin: 0 auto;
  
}



h3 {
  text-align: center;
  line-height: 55px;
  font-size: 28px;
  font-weight: normal;
  color: #666;
  position: relative;
}
h3::after {
  content: " ";
  position: absolute;
  width: 30%;
  height: 2px;
  background-color: #8f97b2;
  bottom: 0;
  left: 50%;
  margin-left: -15%;
}


.goods {
  padding: 50px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.good {
  width: 270px;
  height: 360px;
  box-shadow: 0 0 10px rgba(181, 134, 200, 0.3);
  position: relative;
  border-radius: 4px;
  padding-bottom: 10px;
  padding-left: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
}

.good img {
  width: 96%;
  height: 72%;
  padding: auto;
}

.desc {
  width: 250px;
  height: 45px;
  padding: 0px 20px;
}

.price {
  padding: 0px 20px;
}
.addnum {
    width: 27px;
    height: 28px;
}

.prinput {
    width: 40px;
    height: 23px;
    text-align: center;
}
button.buy {
  background-color: #fa884f;
  color: white;
  border: none;
  padding: 8px 20px;
  position: absolute;
  right: 3px;
}

.topbar {
  height: 40px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}
.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: #fff;
}
.topbar .nav .shopCart {
  width: 120px;
  background: #424242;
}
.topbar .nav .shopCart:hover {
  background: #fff;
}
.topbar .nav .shopCart:hover a {
  color: #ff6700;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}
.topbar .nav .shopCart-full a {
  color: white;
}
</style>
