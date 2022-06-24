import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    UserId:'',  //全局存储用户ID，便于组件的使用
    carlist:[], //购物车列表数据
  },
  getters: {
    getIsAllCheck(state) {
      // 判断是否全选
      let isAllCheck = true;
      for (let i = 0; i < state.carlist.length; i++) {
        const temp = state.carlist[i];

        // 只要有一个商品没有勾选立即return false;
        if (!temp.check) {
          isAllCheck = false;
          return isAllCheck;
        }
      }
      return isAllCheck;
    },   
    getNum(state) {
      // 购物车商品总数量
      let totalNum = 0;
      for (let i = 0; i < state.carlist.length; i++) {
        const temp = state.carlist[i];
        totalNum += parseInt(temp.num);
      }
      return totalNum;
    },
    getCheckNum(state) {
      // 获取购物车勾选的商品总数量
      let totalNum = 0;
      for (let i = 0; i < state.carlist.length; i++) {
        const temp = state.carlist[i];
        if (temp.check) {
          totalNum += parseInt(temp.num);
        }
      }
      return totalNum;
    },
    getTotalPrice(state) {
      // 购物车勾选的商品总价格
      let totalPrice = 0;
      for (let i = 0; i < state.carlist.length; i++) {
        const temp = state.carlist[i];
        if (temp.check) {
          totalPrice += temp.price * temp.num;
        }
      }
      return totalPrice;
    },
    getCheckGoods(state) {
    // 获取勾选的商品信息
    // 用于确认订单页面
      let checkGoods = [];
      for (let i = 0; i < state.carlist.length; i++) {
        const temp = state.carlist[i];
        if (temp.check) {
          checkGoods.push(temp);
        }
      }
      return checkGoods;
    },
  },
  mutations: {
    checkAll(state, data) {
      for (let i = 0; i < state.carlist.length; i++) {
       state.carlist[i].check = data;
     }
    },
  updateShoppingCart(state, payload) {
    state.carlist[payload.key][payload.prop] = payload.val;
  },
  },
  actions: {
    updateShoppingCart({ commit }, payload) {
      commit('updateShoppingCart', payload);
    },   
    checkAll({ commit }, data) {
      commit('checkAll', data);
    },
  },
  modules: {
  }
})
