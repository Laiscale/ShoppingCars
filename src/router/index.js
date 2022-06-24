import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import GoodList from '../views/listpage.vue'
import Register from '../views/Register.vue'
import ShoppingCart from '../views/ShoppingCart'
import Order from '../views/Order'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect:'/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register},
    { path: '/shoppingcart', component: ShoppingCart},
    { path: '/order', component: Order},
    { path: '/Home', component: GoodList}
    
  ]
})
router.beforeEach((to,from,next)=>
{
  // let getFlag = localStorage.getItem("Flag");
  // 登录及注册页面可以直接进入,而主页面需要分情况
  if(to.path=='/login' )
  {
    next();
    console.log(localStorage.s);
  }
  else if(to.path=='/register')
  {
    next();
  }
  else
  {
    if(from.path=="/login")//从登录页面可以直接通过登录进入主页面
    {
      next();
    }
    else{
    	//从/进入,如果登录状态是true，则直接next进入主页面
	      if(localStorage.s === "true")
		    {
		      next();
		      console.log(localStorage['s'])
		    }
	    else {//如果登录状态是false，那么跳转至登录页面,需要登录才能进入主页面
	      next('/login');
	      console.log("需要登录")
	    }
    }
  }
})

export default router;
