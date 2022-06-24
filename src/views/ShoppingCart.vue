<template>
  <div class="shoppingCart">
    <!-- 购物车头部 -->
    <div class="cart-header">
      <div class="cart-header-content">
        <p>
          <i class="el-icon-shopping-cart-full" style="color:#ff6700; font-weight: 600;"></i>
          我的购物车
        </p>
        <!-- <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span> -->
      </div>
    </div>
    <!-- 购物车头部END -->

    <!-- 购物车主要内容区-->
    <div class="content" v-if="this.$store.state.carlist.length>0"> 
      <ul>
        <!-- 购物车表头 -->
        <li class="header">
          <div class="pro-check">
            <el-checkbox v-model="isAllCheck">全选</el-checkbox>
          </div>
          <div class="pro-img"></div>
          <div class="pro-name">商品名称</div>
          <div class="pro-price">单价</div>
          <div class="pro-num">数量</div>
          <div class="pro-total">小计</div>
          <div class="pro-action">操作</div>
        </li>
        <!-- 购物车表头END -->

        <!-- 购物车列表 -->
        <li class="product-list" v-for="(item,index) in this.$store.state.carlist" :key="item.id">
          <div class="pro-check">
            <el-checkbox :value="item.check" @change="checkChange($event,index)"></el-checkbox>
          </div>
          <div class="pro-img">
              <img :src="`http://202.193.53.235:8080/` + item.thumbnail" />
          </div>
          <div class="pro-name">
            {{item.name}}
          </div>
          <div class="pro-price">{{item.price}}元</div>
          <div class="pro-num">
            <span>{{item.num}}</span>
          </div>
          <div class="pro-total pro-total-in">{{item.price*item.num}}元</div>
          <div class="pro-action">
            <el-popover placement="right">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 10px 0 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteItem(item.cardid)"
                >确定</el-button>
              </div>
              <i class="el-icon-error" slot="reference" style="font-size: 18px;"></i>
            </el-popover>
          </div>
        </li>
        <!-- 购物车列表END -->
      </ul>
      
      <div style="height:20px;background-color: #f5f5f5"></div>
      <!-- 购物车底部导航条 --> 
      <div class="cart-bar">
        <div class="cart-bar-left">
          <span>
            <router-link to="/Home">继续购物</router-link>
          </span>
          <span class="sep">|</span>
          <span class="cart-total">
            共
            <span class="cart-total-num">{{getNum}}</span> 件商品，已选择
            <span class="cart-total-num">{{getCheckNum}}</span> 件
          </span>
        </div>
        <div class="cart-bar-right">
          <span>
            <span class="total-price-title">合计：</span>
            <span class="total-price">{{getTotalPrice}}元</span>
          </span>
            <div :class="getCheckNum > 0 ? 'btn-primary' : 'btn-primary-disabled'" @click="ConfirmOrder">去结算</div>
        </div>
      </div>
      <!-- 购物车底部导航条END -->
    </div>
    <!-- 购物车主要内容区END -->

    <!-- 购物车为空的时候显示的内容 v-else -->
    <div v-else class="cart-empty">
      <div class="empty">
        <h2>您的购物车还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <!-- 购物车为空的时候显示的内容END -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(["updateShoppingCart","checkAll"]),
    
    async deleteItem(cardid) {
      //每次请求删除一项商品，多选删除需要多次请求
        for (let i = 0; i < this.$store.state.carlist.length; i++) {
          const temp = this.$store.state.carlist[i]
          if (temp.cardid == cardid) {
            var d = await this.$axios
          .post(`/cart/deleteById?userId=`+this.$store.state.UserId+`&cartId=`+this.$store.state.carlist[i].cardid)
          console.log(d)
          this.$store.state.carlist.splice(i, 1);
          }
        }    
    },
    checkChange(val,key) {
      // 更新vuex中购物车商品是否勾选的状态
      this.updateShoppingCart({ key: key, prop: "check", val: val });
    },
    async ConfirmOrder(){
      //点击结算按钮生成订单
      var product = this.getCheckGoods;
      var carList= '';
      for(let i = 0; i < product.length; i++) {
        const temp = product[i].cardid;
        if(i == product.length - 1){
          carList += temp;
          
        }else{
         carList += temp;
         carList += ',';
        }   
      }
      console.log(carList)
      var k = await this.$axios
          .post(`/order/addCastOrder?userId=`+this.$store.state.UserId+`&cartList=`+carList)
          console.log(k)
          alert("生成订单成功")
          this.$store.state.carlist =[]

    }
  },
  async created() {
       var t = await this.$axios
        .post(`/cart/listByUser?userId=`+ this.$store.state.UserId);
      this.$store.state.carlist = t.data
       console.log(t)
       console.log(this.$store.state.carlist)

       
    
  },
  computed: {
    //计算属性判断是否勾选状态
    isAllCheck: { 
    get() {
      return this.$store.getters.getIsAllCheck;
    },
    set(val) {
      this.checkAll(val);
    }
  },
  ...mapGetters([
      "getShoppingCart",
      "getIsAllCheck",
      "getCheckNum",
      "getTotalPrice",
      "getNum",
      "getCheckGoods"
    ]),
  },

  
}
</script>

<style scoped>
li{
    list-style:none;
}

a{text-decoration: none;}

.shoppingCart {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 购物车头部CSS */
.shoppingCart .cart-header {
  height: 64px;
  border-bottom: 2px solid #ff6700;
  background-color: #fff;
  margin-bottom: 20px;
}
.shoppingCart .cart-header .cart-header-content {
  width: 1225px;
  margin: 0 auto;
}
.shoppingCart .cart-header p {
  font-size: 30px;
  line-height: 16px;
  margin-bottom: 10px;
  float: left;
  font-weight: normal;
  color: #424242;
}
.shoppingCart .cart-header span {
  color: #757575;
  font-size: 12px;
  float: left;
  height: 20px;
  line-height: 25px;
  margin-top: 40px;
  margin-left: 15px;
}
/* 购物车头部CSS END */

/* 购物车主要内容区CSS */
.shoppingCart .content {
  width: 1300px;
  margin: 0 auto;
  background-color: #fff;
}

.shoppingCart .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 购物车表头及CSS */
.shoppingCart .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
.shoppingCart .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
  position: relative;
}
.shoppingCart .content ul .pro-check {
  float: left;
  /* position: absolute; */
  height: 85px;
  width: 110px;
}
.shoppingCart .content ul .pro-check .el-checkbox {
  font-size: 16px;
  margin-left: 16px;
}
.shoppingCart .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
}
.shoppingCart .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.shoppingCart .content ul .pro-name {
  float: left;
  width: 380px;
}
.shoppingCart .content ul .pro-name a {
  color: #424242;
}
.shoppingCart .content ul .pro-name a:hover {
  color: #ff6700;
}
.shoppingCart .content ul .pro-price {
  float: left;
  width: 140px;
  padding-right: 18px;
  text-align: center;
}
.shoppingCart .content ul .pro-num {
  float: left;
  width: 150px;
  text-align: center;
}
.shoppingCart .content ul .pro-total {
  float: left;
  width: 120px;
  padding-right: 81px;
  text-align: right;
}
.shoppingCart .content ul .pro-total-in {
  color: #ff6700;
}
.shoppingCart .content ul .pro-action {
  float: left;
  width: 80px;
  text-align: center;
}
.shoppingCart .content ul .pro-action i:hover {
  color: #ff6700;
}
/* 购物车表头及CSS END */

/* 购物车底部导航条CSS */
.shoppingCart .cart-bar {
  width: 1300px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.shoppingCart .cart-bar .cart-bar-left {
  float: left;
}
.shoppingCart .cart-bar .cart-bar-left a {
  line-height: 50px;
  margin-left: 32px;
  color: #757575;
}
.shoppingCart .cart-bar .cart-bar-left a:hover {
  color: #ff6700;
}
.shoppingCart .cart-bar .cart-bar-left .sep {
  color: #eee;
  margin: 0 20px;
}
.shoppingCart .cart-bar .cart-bar-left .cart-total {
  color: #757575;
}
.shoppingCart .cart-bar .cart-bar-left .cart-total-num {
  color: #ff6700;
}
.shoppingCart .cart-bar .cart-bar-right {
  float: right;
}
.shoppingCart .cart-bar .cart-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.shoppingCart .cart-bar .cart-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #ff6700;
  color: #fff;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #e0e0e0;
  color: #b0b0b0;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary:hover {
  background-color: #f25807;
}
/* 购物车底部导航条CSS END */
/* 购物车主要内容区CSS END */

/* 购物车为空的时候显示的内容CSS */
.shoppingCart .cart-empty {
  width: 1300px;
  margin: 0 auto;
}
.shoppingCart .cart-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.shoppingCart .cart-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.shoppingCart .cart-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 购物车为空的时候显示的内容CSS END */
</style>